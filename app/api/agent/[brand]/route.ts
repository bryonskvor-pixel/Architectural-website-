import { getAgentConfig } from "@/lib/agents/config";
import { checkGuardrails, recordSpend, LIMITS } from "@/lib/agents/guardrails";
import { retrieveForBrand, type RetrievalResult } from "@/lib/retrieval";
import { streamAgentTurn, type AgentSource, type AgentMessage } from "@/lib/claude";

/**
 * SHARED CATALOG-AGENT HANDLER — one endpoint for all brands, selected by the
 * [brand] route param (plan Part 4.5). Per-brand behavior comes from
 * getAgentConfig(brand). Only pilot-enabled brands answer (Skyfold + Smoke
 * Guard first).
 *
 * Flow: resolve config → guardrails (Turnstile + rate/session/spend) → retrieve
 * authoritative D1 params + brand Vectorize chunks → build numbered sources →
 * stream a Haiku answer (system prompt cached) as SSE → record spend to D1.
 *
 * Node.js runtime (Cloudflare REST + Anthropic SDK from Vercel).
 */
export const runtime = "nodejs";
export const maxDuration = 30;

type Body = {
  message?: string;
  sessionId?: string;
  turnstileToken?: string;
  history?: AgentMessage[];
};

/** Turn retrieval results into numbered sources the model cites as [n]. */
function buildSources(r: RetrievalResult): AgentSource[] {
  const sources: AgentSource[] = [];
  let n = 0;

  // Structured params grouped by source document (authoritative for numbers).
  const byDoc = new Map<string, string[]>();
  for (const p of r.parameters) {
    const doc = p.source_doc || "Spec parameters";
    const line = `${p.model_id} · ${p.parameter_name}: ${p.value}${p.unit ? ` ${p.unit}` : ""}`;
    if (!byDoc.has(doc)) byDoc.set(doc, []);
    byDoc.get(doc)!.push(line);
  }
  for (const [doc, lines] of byDoc) {
    sources.push({ n: ++n, label: doc, body: lines.slice(0, 40).join("\n") });
  }

  // Explanatory context chunks.
  for (const c of r.chunks) {
    const label = c.modelId ? `${c.sourceDoc} (${c.modelId})` : c.sourceDoc;
    sources.push({ n: ++n, label, body: c.text });
  }
  return sources;
}

function sse(data: unknown): string {
  return `data: ${JSON.stringify(data)}\n\n`;
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ brand: string }> },
) {
  const { brand } = await params;
  const config = getAgentConfig(brand);
  if (!config) {
    return Response.json({ error: "unknown_brand" }, { status: 404 });
  }
  if (!config.enabled) {
    return Response.json(
      {
        error: "not_enabled",
        message: `The ${config.brandName} agent is coming soon. In the meantime, a specialist can help.`,
      },
      { status: 503 },
    );
  }

  const body = (await req.json().catch(() => ({}))) as Body;
  const message = (body.message ?? "").trim();
  const sessionId = body.sessionId ?? "anon";
  const ip =
    req.headers.get("cf-connecting-ip") ??
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";

  const decision = await checkGuardrails({
    brand: config.slug,
    sessionId,
    ip,
    turnstileToken: body.turnstileToken,
    message,
  });
  if (!decision.allowed) {
    return Response.json(
      { error: decision.reason, message: decision.userMessage },
      { status: decision.reason === "input_rejected" ? 400 : 429 },
    );
  }

  // Retrieve authoritative params + brand-scoped context.
  let retrieval: RetrievalResult;
  try {
    retrieval = await retrieveForBrand(config.d1Brand, config.vectorizeIndex, message);
  } catch {
    return Response.json(
      { error: "retrieval_failed", message: "Couldn't reach the spec data just now. Please try again." },
      { status: 502 },
    );
  }

  const sources = buildSources(retrieval);
  const history = (body.history ?? []).slice(-LIMITS.maxHistoryTurns);

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const enc = new TextEncoder();
      let refused = false;
      try {
        for await (const ev of streamAgentTurn({
          tier: config.tier,
          systemPrompt: config.systemPrompt,
          sources,
          history,
          userMessage: message,
          maxOutputTokens: config.maxOutputTokens,
        })) {
          controller.enqueue(enc.encode(sse(ev)));
          if (ev.type === "done") {
            refused = ev.citations.length === 0;
            await recordSpend({
              brand: config.slug,
              sessionId,
              ip,
              question: message,
              inputTokens: ev.usage.inputTokens,
              outputTokens: ev.usage.outputTokens,
              cachedInputTokens: ev.usage.cachedInputTokens,
              costUsd: ev.usage.costUsd,
              refused,
              escalated: ev.escalated,
            });
          }
        }
      } catch {
        controller.enqueue(
          enc.encode(sse({ type: "error", message: "The agent hit an error. Please try again." })),
        );
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
