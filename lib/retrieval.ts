/**
 * RETRIEVAL — Cloudflare data tier (D1 structured params + per-brand Vectorize
 * index), reached over the REST API from Vercel. Mirrors the pattern proven in
 * pm-intelligence-agent (src/lib/cloudflare.js). The five indexes and the D1
 * parameter store are ALREADY POPULATED for all brands; this site only reads
 * them. See CLAUDE.md § Data tier.
 */

import { cfFetch, d1Query } from "@/lib/cloudflare";

const PARAMS_DB = process.env.D1_PARAMS_DATABASE_ID;

/** Structured spec parameter row from D1 `parameters` (authoritative for numbers). */
export type SpecParameter = {
  brand: string;
  model_id: string;
  parameter_name: string;
  value: string;
  unit?: string;
  source_doc?: string;
};

/** A retrieved context chunk from a brand's Vectorize index (explanatory prose). */
export type RetrievedChunk = {
  id: string;
  score: number;
  text: string;
  /** Human-readable source label (Vectorize metadata `section`, or model_id). */
  sourceDoc: string;
  modelId?: string;
};

export type RetrievalResult = {
  parameters: SpecParameter[];
  chunks: RetrievedChunk[];
  /** Max similarity score across chunks — the handler uses this to decide
   * whether retrieval is confident enough to answer (else escalate). */
  topScore: number;
};

/** Embed text with Workers AI bge-base-en-v1.5 (768-dim, matches the indexes). */
export async function embedText(texts: string[]): Promise<number[][]> {
  const result = await cfFetch<{ data: number[][] }>(
    "/ai/run/@cf/baai/bge-base-en-v1.5",
    { method: "POST", body: JSON.stringify({ text: texts }) },
  );
  return result.data;
}

type VectorizeMatch = {
  id: string;
  score: number;
  metadata?: { text?: string; section?: string; model_id?: string };
};

/** Semantic search over a brand's isolated Vectorize index. */
export async function vectorizeQuery(
  indexName: string,
  vector: number[],
  { topK = 5 }: { topK?: number } = {},
): Promise<RetrievedChunk[]> {
  const result = await cfFetch<{ matches: VectorizeMatch[] }>(
    `/vectorize/v2/indexes/${indexName}/query`,
    {
      method: "POST",
      body: JSON.stringify({ vector, topK, returnMetadata: "all" }),
    },
  );
  return (result.matches ?? []).map((m) => ({
    id: m.id,
    score: m.score,
    text: m.metadata?.text ?? "",
    sourceDoc: m.metadata?.section ?? m.metadata?.model_id ?? m.id,
    modelId: m.metadata?.model_id,
  }));
}

/**
 * Fetch a brand's spec parameters. Always includes brand-wide `*-GENERAL` rows;
 * if specific models are detected in the message, narrows to those + GENERAL,
 * otherwise returns the full brand set (small — ~100 rows per brand). Numbers
 * served here are authoritative and versioned (plan Part 4.4).
 */
export async function queryParameters(
  brand: string,
  detectedModelIds: string[] = [],
): Promise<SpecParameter[]> {
  if (!PARAMS_DB) throw new Error("D1_PARAMS_DATABASE_ID must be set");
  const rows = await d1Query<SpecParameter>(
    PARAMS_DB,
    "SELECT brand, model_id, parameter_name, value, unit, source_doc FROM parameters WHERE brand = ? ORDER BY model_id, parameter_name",
    [brand],
  );
  if (detectedModelIds.length === 0) return rows;
  const keep = new Set(detectedModelIds);
  return rows.filter((r) => keep.has(r.model_id) || r.model_id.endsWith("-GENERAL"));
}

/**
 * Detect which model_ids a message references, so params can be narrowed. Light
 * token matching against the brand's known model_ids (derived from the rows):
 * a model matches when the distinctive tokens after the brand prefix all appear
 * in the message (e.g. "classic 60" → SKYFOLD-CLASSIC-60; "M2100" → M2100).
 */
export function detectModelIds(message: string, modelIds: string[]): string[] {
  const hay = message.toLowerCase().replace(/[-_]/g, " ");
  const hits: string[] = [];
  for (const id of modelIds) {
    if (id.endsWith("-GENERAL")) continue;
    const tokens = id.toLowerCase().replace(/^[a-z]+-?/, "").split(/[-_]/).filter(Boolean);
    const compact = id.toLowerCase().replace(/[-_]/g, "");
    if (compact && hay.replace(/\s/g, "").includes(compact)) {
      hits.push(id);
      continue;
    }
    if (tokens.length > 0 && tokens.every((t) => hay.includes(t))) {
      hits.push(id);
    }
  }
  return hits;
}

/**
 * The one call the agent handler makes: authoritative params + supporting
 * chunks for a brand, plus the top similarity score so the handler can decide
 * to answer or escalate (plan Part 4.4 — never fabricate on low confidence).
 */
export async function retrieveForBrand(
  brand: string,
  indexName: string,
  message: string,
): Promise<RetrievalResult> {
  // One D1 read gives us every model_id for detection + the params themselves.
  const allRows = await queryParameters(brand, []);
  const modelIds = Array.from(new Set(allRows.map((r) => r.model_id)));
  const detected = detectModelIds(message, modelIds);
  const keep = new Set(detected);
  const parameters =
    detected.length === 0
      ? allRows
      : allRows.filter((r) => keep.has(r.model_id) || r.model_id.endsWith("-GENERAL"));

  const [vector] = await embedText([message]);
  const chunks = vector ? await vectorizeQuery(indexName, vector, { topK: 5 }) : [];
  const topScore = chunks.reduce((m, c) => Math.max(m, c.score), 0);

  return { parameters, chunks, topScore };
}
