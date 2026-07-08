import { NextResponse } from "next/server";

/**
 * RFQ / RFI SUBMISSION endpoint (plan Part 6.2). Receives the structured
 * quote/RFI form (and the agents' human-escalation hand-off, pre-filled with
 * the conversation topic + product line). Sell-only Airolite submissions are
 * framed as "takeoff" rather than "field measure".
 *
 * SCAFFOLD: validates presence and echoes; delivery (email/CRM/D1) and
 * Turnstile verification are wired in a later session.
 */
export const runtime = "nodejs";

type RfqBody = {
  name?: string;
  email?: string;
  company?: string;
  productLine?: string;
  message?: string;
  turnstileToken?: string;
};

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as RfqBody;
  if (!body.email || !body.message) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }

  // TODO(later-session): verify Turnstile, then persist/deliver (email + D1 log).
  return NextResponse.json(
    { error: "not_implemented", message: "RFQ intake is scaffolded, not yet wired." },
    { status: 501 },
  );
}
