/**
 * GUARDRAILS — public-deployment safeguards for the catalog agents
 * (plan Part 4.6). Layered: input screening, scope refusal, prompt-injection
 * resistance, rate limiting, per-session caps, Turnstile bot gate, and a global
 * daily-spend circuit breaker. Rate/cost state lives in D1.
 *
 * SCAFFOLD: typed interfaces + intended checks with TODO markers. Real
 * enforcement (D1 counters, Turnstile siteverify, cost accounting) is wired in
 * the agent session. Defaults below are conservative starting points.
 */

export type GuardrailContext = {
  brand: string;
  sessionId: string;
  ip: string;
  /** Cloudflare Turnstile token from the first message of a session. */
  turnstileToken?: string;
  message: string;
};

export type GuardrailDecision =
  | { allowed: true }
  | { allowed: false; reason: GuardrailReason; userMessage: string };

export type GuardrailReason =
  | "turnstile_failed"
  | "rate_limited"
  | "session_cap_reached"
  | "daily_spend_ceiling"
  | "input_rejected";

export const LIMITS = {
  /** Messages per session per minute. */
  perSessionPerMinute: 6,
  /** Hard message cap per session per day. */
  perSessionPerDay: 40,
  /** Trim conversation history to this many turns before sending to the model. */
  maxHistoryTurns: 8,
  /** Global daily spend ceiling (USD); breaker trips the agents off above this. */
  dailySpendCeilingUsd: Number(process.env.AGENT_DAILY_SPEND_CEILING_USD ?? 25),
} as const;

/** Verify a Cloudflare Turnstile token (gates the first message of a session). */
export async function verifyTurnstile(_token: string, _ip: string): Promise<boolean> {
  // TODO(agent-session): POST to Turnstile /siteverify with TURNSTILE_SECRET_KEY.
  return false;
}

/**
 * Run the full guardrail chain before any model call. Order matters: cheap
 * local checks first, then D1-backed rate/cost checks, then the bot gate.
 */
export async function checkGuardrails(
  _ctx: GuardrailContext,
): Promise<GuardrailDecision> {
  // TODO(agent-session), in order:
  //   1. daily-spend circuit breaker (D1) → daily_spend_ceiling
  //   2. per-IP + per-session rate limit (D1 counters) → rate_limited
  //   3. per-session daily cap (D1) → session_cap_reached
  //   4. first message of session → verifyTurnstile → turnstile_failed
  //   5. basic input screening (length, obvious injection markers) → input_rejected
  // Default-closed until wired:
  return {
    allowed: false,
    reason: "input_rejected",
    userMessage:
      "The catalog agent isn't available yet. Please contact a specialist in the meantime.",
  };
}

/**
 * Record token spend for a completed turn so the circuit breaker and
 * per-session accounting stay current. Logged to D1 for monitoring / SEO
 * long-tail mining (plan Part 4.6 / 7.2).
 */
export async function recordSpend(_args: {
  brand: string;
  sessionId: string;
  inputTokens: number;
  outputTokens: number;
  cachedInputTokens: number;
  refused: boolean;
  escalated: boolean;
}): Promise<void> {
  // TODO(agent-session): INSERT into a D1 agent_events/usage table.
}
