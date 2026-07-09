import { NextResponse } from "next/server";
import { d1Query, DB_IDS, isCloudflareConfigured } from "@/lib/cloudflare";
import { verifyTurnstile } from "@/lib/agents/guardrails";
import { getLine, isSellOnly } from "@/lib/products";

/**
 * RFQ / RFI SUBMISSION endpoint (plan Part 6.2). Receives the structured
 * quote/RFI form and the agents' human-escalation hand-off (pre-filled with the
 * conversation topic + product line). Flow: validate → Turnstile-verify →
 * persist the lead to the dedicated web-agent D1 (`rfq_submissions`).
 *
 * Delivery is D1 capture only for now — the plan forbids new paid services and
 * email routing needs the (unfinalized) company domain. An email/CRM notifier
 * can hook off `rfq_submissions` once the domain lands (Session 5 notes).
 *
 * Sell-only Airolite submissions are framed as "takeoff" rather than
 * "field measure" — gated on isSellOnly(), never by brand name (CLAUDE.md).
 */
export const runtime = "nodejs";

const WEB_DB = DB_IDS.webAgent;

type RfqBody = {
  name?: string;
  email?: string;
  company?: string;
  phone?: string;
  productLine?: string;
  message?: string;
  turnstileToken?: string;
  /** "agent-escalation" | "request-quote-form" — where the lead came from. */
  source?: string;
  /** Present when the lead is escalated from a catalog-agent conversation. */
  sessionId?: string;
};

const MAX = { name: 120, email: 200, company: 160, phone: 40, message: 4000 } as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Intent framing: sell-only lines request a takeoff, not a field measure. */
function intentFor(productLine?: string): string {
  if (!productLine) return "quote";
  const line = getLine(productLine);
  if (!line) return "quote";
  return isSellOnly(line) ? "takeoff" : "field-measure";
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as RfqBody;

  const email = (body.email ?? "").trim();
  const message = (body.message ?? "").trim();
  if (!EMAIL_RE.test(email) || message.length === 0) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }
  if (
    email.length > MAX.email ||
    message.length > MAX.message ||
    (body.name ?? "").length > MAX.name ||
    (body.company ?? "").length > MAX.company ||
    (body.phone ?? "").length > MAX.phone
  ) {
    return NextResponse.json({ error: "field_too_long" }, { status: 400 });
  }

  const ip =
    req.headers.get("cf-connecting-ip") ??
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";

  // Bot gate — same Turnstile verification the agents use (dev-bypassed when no
  // secret is configured).
  const human = await verifyTurnstile(body.turnstileToken ?? "", ip);
  if (!human) {
    return NextResponse.json(
      { error: "turnstile_failed", message: "Please complete the verification challenge and try again." },
      { status: 400 },
    );
  }

  const intent = intentFor(body.productLine);

  // No Cloudflare credentials (local dev) → accept so the form is testable.
  if (!isCloudflareConfigured()) {
    return NextResponse.json({ ok: true, intent, persisted: false });
  }

  try {
    await d1Query(
      WEB_DB,
      `INSERT INTO rfq_submissions
        (ts, name, email, company, phone, product_line, intent, message, source, agent_session_id, ip)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        Date.now(),
        (body.name ?? "").trim(),
        email,
        (body.company ?? "").trim(),
        (body.phone ?? "").trim(),
        (body.productLine ?? "").trim(),
        intent,
        message.slice(0, MAX.message),
        (body.source ?? "request-quote-form").trim(),
        (body.sessionId ?? "").trim(),
        ip,
      ],
    );
  } catch {
    // A lead must never be silently dropped — tell the user to try again / call.
    return NextResponse.json(
      {
        error: "persist_failed",
        message: "We couldn't record your request just now. Please try again, or call us directly.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, intent, persisted: true });
}
