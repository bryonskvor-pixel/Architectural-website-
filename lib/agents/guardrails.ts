import { d1Query } from "@/lib/cloudflare";

/**
 * GUARDRAILS — public-deployment safeguards for the catalog agents
 * (plan Part 4.6). Layered: input screening, Cloudflare Turnstile bot gate on
 * the first message, per-session rate limiting, a per-session daily cap, and a
 * global daily-spend circuit breaker. All rate/cost state lives in the
 * dedicated `architectural-web-agent` D1 database (isolated from internal PM
 * data).
 *
 * Fail-closed on infrastructure errors is deliberate for the money-spending
 * path: if the state DB can't be reached we refuse rather than risk an
 * unmetered spend. When no state DB is configured at all (local dev), we allow
 * so the flow is testable.
 */

const WEB_DB = process.env.WEB_AGENT_D1_DATABASE_ID;
const TURNSTILE_SECRET = process.env.TURNSTILE_SECRET_KEY;

export type GuardrailContext = {
  brand: string;
  sessionId: string;
  ip: string;
  turnstileToken?: string;
  message: string;
};

export type GuardrailReason =
  | "turnstile_failed"
  | "rate_limited"
  | "session_cap_reached"
  | "daily_spend_ceiling"
  | "input_rejected"
  | "infra_error";

export type GuardrailDecision =
  | { allowed: true }
  | { allowed: false; reason: GuardrailReason; userMessage: string };

export const LIMITS = {
  perSessionPerMinute: 6,
  perSessionPerDay: 40,
  maxHistoryTurns: 8,
  maxMessageChars: 1000,
  dailySpendCeilingUsd: Number(process.env.AGENT_DAILY_SPEND_CEILING_USD ?? 25),
} as const;

function startOfUtcDay(now: number): number {
  return now - (now % 86_400_000);
}

/** Verify a Cloudflare Turnstile token (gates the first message of a session). */
export async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  if (!TURNSTILE_SECRET) return true; // dev: no secret configured → gate disabled
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret: TURNSTILE_SECRET, response: token, remoteip: ip }),
    });
    const json = (await res.json()) as { success: boolean };
    return json.success === true;
  } catch {
    return false;
  }
}

type CountRow = { n: number };
type SumRow = { s: number | null };
type SessionRow = { message_count: number; turnstile_verified: number };

/**
 * Run the full guardrail chain before any model call. Cheap local checks first,
 * then the D1-backed rate/cost checks, then the bot gate.
 */
export async function checkGuardrails(ctx: GuardrailContext): Promise<GuardrailDecision> {
  // 1. Input screening (local, free).
  const msg = ctx.message.trim();
  if (msg.length === 0 || msg.length > LIMITS.maxMessageChars) {
    return {
      allowed: false,
      reason: "input_rejected",
      userMessage: `Please keep questions under ${LIMITS.maxMessageChars} characters.`,
    };
  }

  // No state DB configured (local dev) → allow so the flow is testable.
  if (!WEB_DB) return { allowed: true };

  const now = Date.now();
  try {
    // 2. Global daily-spend circuit breaker.
    const [{ s: spentToday } = { s: 0 }] = await d1Query<SumRow>(
      WEB_DB,
      "SELECT SUM(cost_usd) s FROM agent_events WHERE ts >= ?",
      [startOfUtcDay(now)],
    );
    if ((spentToday ?? 0) >= LIMITS.dailySpendCeilingUsd) {
      return {
        allowed: false,
        reason: "daily_spend_ceiling",
        userMessage:
          "The catalog agent is paused for today. Please contact a specialist and we'll answer directly.",
      };
    }

    // 3. Per-session rate limit (per minute).
    const [{ n: lastMinute } = { n: 0 }] = await d1Query<CountRow>(
      WEB_DB,
      "SELECT COUNT(*) n FROM agent_events WHERE session_id = ? AND ts >= ?",
      [ctx.sessionId, now - 60_000],
    );
    if (lastMinute >= LIMITS.perSessionPerMinute) {
      return {
        allowed: false,
        reason: "rate_limited",
        userMessage: "You're sending messages quickly — please wait a moment and try again.",
      };
    }

    // 4. Per-session daily cap.
    const [{ n: today } = { n: 0 }] = await d1Query<CountRow>(
      WEB_DB,
      "SELECT COUNT(*) n FROM agent_events WHERE session_id = ? AND ts >= ?",
      [ctx.sessionId, startOfUtcDay(now)],
    );
    if (today >= LIMITS.perSessionPerDay) {
      return {
        allowed: false,
        reason: "session_cap_reached",
        userMessage:
          "You've reached today's question limit for this session. A specialist can pick up from here.",
      };
    }

    // 5. Turnstile gate on the first message of a session.
    const [session] = await d1Query<SessionRow>(
      WEB_DB,
      "SELECT message_count, turnstile_verified FROM agent_sessions WHERE session_id = ?",
      [ctx.sessionId],
    );
    const isFirstMessage = !session || session.message_count === 0;
    const alreadyVerified = session?.turnstile_verified === 1;
    if (isFirstMessage && !alreadyVerified) {
      const ok = await verifyTurnstile(ctx.turnstileToken ?? "", ctx.ip);
      if (!ok) {
        return {
          allowed: false,
          reason: "turnstile_failed",
          userMessage: "Please complete the verification challenge and try again.",
        };
      }
      // Record verification so subsequent messages skip the gate.
      await d1Query(
        WEB_DB,
        `INSERT INTO agent_sessions (session_id, created_at, turnstile_verified, message_count, last_ts)
         VALUES (?, ?, 1, 0, ?)
         ON CONFLICT(session_id) DO UPDATE SET turnstile_verified = 1`,
        [ctx.sessionId, now, now],
      );
    }

    return { allowed: true };
  } catch {
    // Fail closed on the money path.
    return {
      allowed: false,
      reason: "infra_error",
      userMessage: "The catalog agent is temporarily unavailable. Please try again shortly.",
    };
  }
}

/**
 * Record token spend + session bookkeeping for a completed turn. Feeds the
 * circuit breaker, per-session accounting, and SEO long-tail mining
 * (plan Part 4.6 / 7.2). Best-effort — never throws into the response path.
 */
export async function recordSpend(args: {
  brand: string;
  sessionId: string;
  ip: string;
  question: string;
  inputTokens: number;
  outputTokens: number;
  cachedInputTokens: number;
  costUsd: number;
  refused: boolean;
  escalated: boolean;
}): Promise<void> {
  if (!WEB_DB) return;
  const now = Date.now();
  try {
    await d1Query(
      WEB_DB,
      `INSERT INTO agent_events
        (ts, brand, session_id, ip, question, input_tokens, output_tokens, cached_input_tokens, cost_usd, refused, escalated)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        now,
        args.brand,
        args.sessionId,
        args.ip,
        args.question.slice(0, 500),
        args.inputTokens,
        args.outputTokens,
        args.cachedInputTokens,
        args.costUsd,
        args.refused ? 1 : 0,
        args.escalated ? 1 : 0,
      ],
    );
    await d1Query(
      WEB_DB,
      `INSERT INTO agent_sessions (session_id, created_at, turnstile_verified, message_count, last_ts)
       VALUES (?, ?, 0, 1, ?)
       ON CONFLICT(session_id) DO UPDATE SET message_count = message_count + 1, last_ts = ?`,
      [args.sessionId, now, now, now],
    );
  } catch {
    // Logging is best-effort; don't disrupt the user's answer.
  }
}
