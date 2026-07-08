/**
 * RETRIEVAL — Cloudflare data tier (D1 structured params + per-brand Vectorize
 * index). Mirrors the REST access pattern proven in pm-intelligence-agent
 * (src/lib/cloudflare.js): the public site runs on Vercel and reaches Cloudflare
 * over the REST API using a scoped token (D1:Edit + Vectorize:Edit + Workers
 * AI:Read). The five indexes and the D1 parameter store are ALREADY POPULATED
 * for all five brands by pm-intelligence-agent — this site only reads them,
 * with new public-scoped prompts. See CLAUDE.md § Data tier.
 *
 * SCAFFOLD: types + the intended call shapes are defined; the network calls are
 * marked TODO and are wired in the agent session.
 */

const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
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
  sourceDoc: string;
  sourceUrl?: string;
};

export type RetrievalResult = {
  /** Authoritative numeric/spec facts — prefer these over generated numbers. */
  parameters: SpecParameter[];
  /** Explanatory passages for context and citations. */
  chunks: RetrievedChunk[];
};

function assertConfigured(): void {
  if (!ACCOUNT_ID || !API_TOKEN) {
    throw new Error(
      "CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_API_TOKEN must be set (see .env.example)",
    );
  }
}

/** Low-level Cloudflare REST helper (same shape as pm-intelligence-agent). */
async function cfFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  assertConfigured();
  const res = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}${path}`,
    {
      ...options,
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        "Content-Type": "application/json",
        ...options.headers,
      },
    },
  );
  const json = (await res.json()) as { success: boolean; errors?: unknown; result: T };
  if (!json.success) {
    throw new Error(`Cloudflare API error: ${JSON.stringify(json.errors)}`);
  }
  return json.result;
}

/**
 * Query authoritative spec parameters for a brand (optionally narrowed to
 * detected model IDs). Numbers served here are versioned and trusted; the agent
 * must prefer them over free-text generation (plan Part 4.4).
 */
export async function queryParameters(
  _brand: string,
  _modelIds?: string[],
): Promise<SpecParameter[]> {
  // TODO(agent-session): SELECT * FROM parameters WHERE brand = ? [AND model_id IN (...)]
  // via cfFetch(`/d1/database/${PARAMS_DB}/query`, { method: "POST", body: {...} }).
  void PARAMS_DB;
  return [];
}

/** Embed text with Workers AI bge-base-en-v1.5 (768-dim, matches the indexes). */
export async function embedText(_texts: string[]): Promise<number[][]> {
  // TODO(agent-session): POST /ai/run/@cf/baai/bge-base-en-v1.5 → result.data
  return [];
}

/** Semantic search over a brand's isolated Vectorize index (no cross-brand bleed). */
export async function vectorizeQuery(
  _indexName: string,
  _vector: number[],
  _opts: { topK?: number } = {},
): Promise<RetrievedChunk[]> {
  // TODO(agent-session): POST /vectorize/v2/indexes/${index}/query → map matches → RetrievedChunk[]
  return [];
}

/**
 * The one call an agent handler makes: given the user's message and a brand,
 * return authoritative parameters + supporting chunks from that brand's index.
 * Low retrieval confidence must surface upstream so the agent can say so and
 * escalate rather than fabricate (plan Part 4.4).
 */
export async function retrieveForBrand(
  _brand: string,
  _indexName: string,
  _message: string,
): Promise<RetrievalResult> {
  // TODO(agent-session): detect model IDs → queryParameters + embed→vectorizeQuery
  return { parameters: [], chunks: [] };
}
