/**
 * CLAUDE CLIENT — Anthropic API wrapper for the catalog agents.
 *
 * Model strategy (plan Part 4.6): default Claude Haiku 4.5
 * (`claude-haiku-4-5`, $1/$5 per MTok) for retrieval-grounded catalog Q&A;
 * escalate to Sonnet only for complex multi-part reasoning. Prompt caching is
 * applied to the large, static per-brand system prompt + spec context so the
 * cached prefix bills at ~10% of base input across all sessions.
 *
 * SCAFFOLD: types + intended shape only. The actual @anthropic-ai/sdk call,
 * streaming, and cache_control breakpoints are wired in the agent session.
 */

export const MODELS = {
  /** Default tier for catalog Q&A — high-volume, latency-sensitive. */
  haiku: "claude-haiku-4-5",
  /** Escalation tier for complex multi-part reasoning only. */
  sonnet: "claude-sonnet-5",
} as const;

export type ModelTier = keyof typeof MODELS;

export type Citation = {
  label: string; // e.g. "Skyfold Classic spec (10 22 39)"
  sourceDoc: string;
  sourceUrl?: string;
};

export type AgentMessage = { role: "user" | "assistant"; content: string };

export type AgentAnswer = {
  text: string;
  citations: Citation[];
  /** True when the model refused / escalated rather than answering. */
  escalated: boolean;
  usage: { inputTokens: number; outputTokens: number; cachedInputTokens: number };
};

/**
 * Run one agent turn. The system prompt (static, per-brand) is cached; the
 * retrieved context is injected as clearly-labeled UNTRUSTED DATA, never as
 * instructions (plan Part 4.6 — prompt-injection defense). Output tokens are
 * capped; conversation history is trimmed upstream.
 */
export async function runAgentTurn(_args: {
  tier: ModelTier;
  /** Cached, static per-brand system prompt (>= ~1,024 tokens to be cacheable). */
  systemPrompt: string;
  /** Retrieved parameters + chunks, rendered into a labeled context block. */
  contextBlock: string;
  history: AgentMessage[];
  userMessage: string;
  maxOutputTokens: number;
}): Promise<AgentAnswer> {
  // TODO(agent-session): call @anthropic-ai/sdk messages.stream with
  // system: [{ type: "text", text: systemPrompt, cache_control: { type: "ephemeral" } }]
  // and a labeled <context> ... </context> user block for retrieved docs.
  throw new Error("runAgentTurn not yet wired — see CLAUDE.md § Agents");
}
