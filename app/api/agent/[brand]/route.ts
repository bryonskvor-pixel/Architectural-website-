import { NextResponse } from "next/server";
import { getAgentConfig } from "@/lib/agents/config";
import { checkGuardrails } from "@/lib/agents/guardrails";
import { retrieveForBrand } from "@/lib/retrieval";
// import { runAgentTurn } from "@/lib/claude"; // wired in the agent session

/**
 * SHARED CATALOG-AGENT HANDLER — one endpoint for all five brands, selected by
 * the [brand] route param (plan Part 4.5). Per-brand behavior comes entirely
 * from getAgentConfig(brand): system prompt, Vectorize index, D1 scope, model
 * tier, and the sell-only flag.
 *
 * Flow (SCAFFOLD — the model call is intentionally not wired yet):
 *   1. resolve per-brand config (404 unknown brand)
 *   2. guardrails: Turnstile + rate limit + session cap + daily-spend breaker
 *   3. retrieve authoritative D1 params + brand Vectorize chunks
 *   4. runAgentTurn (Haiku + prompt caching), stream, attach citations
 *   5. record spend to D1
 *
 * Runs on the Node.js runtime (Cloudflare REST + Anthropic SDK from Vercel).
 */
export const runtime = "nodejs";

type Body = { message?: string; sessionId?: string; turnstileToken?: string };

export async function POST(
  req: Request,
  { params }: { params: Promise<{ brand: string }> },
) {
  const { brand } = await params;
  const config = getAgentConfig(brand);
  if (!config) {
    return NextResponse.json({ error: "unknown_brand" }, { status: 404 });
  }

  const body = (await req.json().catch(() => ({}))) as Body;
  const message = (body.message ?? "").trim();
  if (!message) {
    return NextResponse.json({ error: "empty_message" }, { status: 400 });
  }

  const ip = req.headers.get("cf-connecting-ip") ?? req.headers.get("x-forwarded-for") ?? "unknown";

  const decision = await checkGuardrails({
    brand: config.slug,
    sessionId: body.sessionId ?? "anon",
    ip,
    turnstileToken: body.turnstileToken,
    message,
  });
  if (!decision.allowed) {
    return NextResponse.json(
      { error: decision.reason, message: decision.userMessage },
      { status: 429 },
    );
  }

  // Retrieval (returns empty in the scaffold).
  const retrieval = await retrieveForBrand(config.d1Brand, config.vectorizeIndex, message);
  void retrieval;

  // TODO(agent-session): runAgentTurn(...) with prompt caching + streaming,
  // attach citation chips, then recordSpend(...). Until then, respond 501 so
  // the contract is explicit and the front end shows the "not available" state.
  return NextResponse.json(
    {
      error: "not_implemented",
      message:
        "The catalog agent is scaffolded but not yet wired. See CLAUDE.md § Agents.",
      brand: config.slug,
      sellOnly: config.sellOnly,
    },
    { status: 501 },
  );
}
