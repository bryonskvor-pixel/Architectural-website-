"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { productLines, getLine, isSellOnly, type BrandSlug } from "@/lib/products";
import { activeBrand } from "@/lib/brand";

/**
 * Request a Quote / RFI form (plan Part 6.2). Posts to /api/rfq, which persists
 * the lead to the web-agent D1. Doubles as the catalog agents' human-escalation
 * target: it reads `?line=&topic=&session=&source=` query params (plan Part 4.5,
 * "routes to RFI form pre-filled with the conversation topic and product line").
 *
 * Sell-vs-install is honored on the CTA: sell-only lines ask for a "takeoff",
 * install lines a "quote / field measure" — gated on isSellOnly(), never by name.
 */

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const LINE_SLUGS = Object.keys(productLines) as BrandSlug[];

type Status = "idle" | "sending" | "sent" | "error";

export function RfqForm() {
  const params = useSearchParams();
  const prefillLine = params.get("line") ?? "";
  const prefillTopic = params.get("topic") ?? "";
  const agentSession = params.get("session") ?? "";
  const source = params.get("source") ?? "request-quote-form";

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [productLine, setProductLine] = useState<string>(
    LINE_SLUGS.includes(prefillLine as BrandSlug) ? prefillLine : "",
  );
  const [message, setMessage] = useState(
    prefillTopic ? `Following up on my question:\n"${prefillTopic}"\n\n` : "",
  );
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileRef = useRef<HTMLDivElement>(null);

  const selected = productLine ? getLine(productLine) : undefined;
  const sellOnly = selected ? isSellOnly(selected) : false;
  const ctaLabel = useMemo(() => {
    if (status === "sending") return "Sending…";
    return sellOnly ? "Request takeoff" : "Request quote";
  }, [sellOnly, status]);

  // Render the Turnstile widget once, only when a site key is configured.
  useEffect(() => {
    if (!TURNSTILE_SITE_KEY || !turnstileRef.current) return;
    const id = "cf-turnstile-script";
    const boot = () => {
      if (window.turnstile && turnstileRef.current) {
        window.turnstile.render(turnstileRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          callback: (token: string) => setTurnstileToken(token),
        });
      }
    };
    if (document.getElementById(id)) {
      boot();
    } else {
      const s = document.createElement("script");
      s.id = id;
      s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      s.async = true;
      s.onload = boot;
      document.head.appendChild(s);
    }
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/rfq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          company,
          email,
          phone,
          productLine,
          message,
          turnstileToken,
          source,
          sessionId: agentSession,
        }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { message?: string; error?: string };
        setErrorMsg(
          data.message ??
            (data.error === "missing_fields"
              ? "Please enter a valid email and a message."
              : "Something went wrong. Please try again."),
        );
        setStatus("error");
        return;
      }
      setStatus("sent");
    } catch {
      setErrorMsg("Connection interrupted. Please try again, or call us directly.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="border border-accent bg-surface p-6">
        <p className="font-mono text-xs uppercase tracking-wide text-accent">Request received</p>
        <p className="mt-3 text-lg text-ink">
          Thanks{name ? `, ${name.split(" ")[0]}` : ""} — a {selected ? selected.name : activeBrand.name}{" "}
          specialist will follow up shortly.
        </p>
        <p className="mt-2 text-sm text-ink-muted">
          {sellOnly
            ? "We'll pull together a takeoff and current lead times."
            : "We'll review your scope and reach out to coordinate next steps."}
        </p>
      </div>
    );
  }

  const inputCls =
    "w-full border border-hairline bg-canvas px-3 py-2 text-sm text-ink outline-none focus:border-accent";
  const labelCls = "mb-1.5 block font-mono text-[11px] uppercase tracking-wide text-ink-muted";

  return (
    <form onSubmit={submit} className="max-w-2xl">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="rfq-name" className={labelCls}>Name</label>
          <input id="rfq-name" className={inputCls} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
        </div>
        <div>
          <label htmlFor="rfq-company" className={labelCls}>Company / firm</label>
          <input id="rfq-company" className={inputCls} value={company} onChange={(e) => setCompany(e.target.value)} autoComplete="organization" />
        </div>
        <div>
          <label htmlFor="rfq-email" className={labelCls}>Email *</label>
          <input id="rfq-email" type="email" required className={inputCls} value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
        </div>
        <div>
          <label htmlFor="rfq-phone" className={labelCls}>Phone</label>
          <input id="rfq-phone" type="tel" className={inputCls} value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="rfq-line" className={labelCls}>Product line</label>
        <select
          id="rfq-line"
          className={`${inputCls} font-mono`}
          value={productLine}
          onChange={(e) => setProductLine(e.target.value)}
        >
          <option value="">Not sure / multiple</option>
          {LINE_SLUGS.map((slug) => (
            <option key={slug} value={slug}>
              {productLines[slug].name}
              {isSellOnly(productLines[slug]) ? " (supply only)" : ""}
            </option>
          ))}
        </select>
        {selected && (
          <p className="mt-1.5 text-[11px] text-ink-muted">
            {sellOnly
              ? `${selected.name} is supplied by us and installed by your contractor — we'll prepare a takeoff.`
              : `${selected.name}: supply, install, and service — we can field-measure and coordinate the structural/electrical scope.`}
          </p>
        )}
      </div>

      <div className="mt-5">
        <label htmlFor="rfq-message" className={labelCls}>Project / question *</label>
        <textarea
          id="rfq-message"
          required
          rows={6}
          className={inputCls}
          placeholder="Opening sizes, CSI scope, ratings needed, drawings/plan set, timeline…"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      {/* Turnstile widget (renders only when a site key is configured). */}
      <div ref={turnstileRef} className="mt-5 empty:hidden" />

      {status === "error" && (
        <p className="mt-4 border-l-2 border-accent pl-3 text-sm text-ink-muted">{errorMsg}</p>
      )}

      <div className="mt-6 flex items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="border border-accent bg-accent px-6 py-2.5 font-mono text-xs uppercase tracking-wide text-accent-ink hover:opacity-90 disabled:opacity-50"
        >
          {ctaLabel}
        </button>
        <span className="font-mono text-[10px] text-ink-muted">* required</span>
      </div>
    </form>
  );
}
