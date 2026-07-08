"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ProductLine } from "@/lib/products";
import { isSellOnly } from "@/lib/products";

/**
 * "Ask the [Line] Agent" — a technical "catalog terminal" (plan Part 5.2), not a
 * cartoon chat. Streams answers from /api/agent/[brand] over SSE, renders
 * inline [n] citations as source chips, always offers human escalation, and
 * gates the first message with Cloudflare Turnstile when a site key is set.
 *
 * `enabled` reflects the pilot rollout — disabled lines show a "coming soon"
 * state that routes to a specialist.
 */

type Citation = { n: number; label: string };
type Turn = { role: "user" | "assistant"; text: string; citations?: Citation[] };

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
    };
  }
}

export function AgentPanel({
  line,
  enabled,
}: {
  line: ProductLine;
  enabled: boolean;
}) {
  const [input, setInput] = useState("");
  const [turns, setTurns] = useState<Turn[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState("");
  const sessionId = useRef<string>("");
  const turnstileRef = useRef<HTMLDivElement>(null);
  const sellOnly = isSellOnly(line);

  useEffect(() => {
    sessionId.current =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `s-${Date.now()}-${Math.floor(Math.random() * 1e9)}`;
  }, []);

  // Render the Turnstile widget once, only when a site key is configured.
  useEffect(() => {
    if (!enabled || !TURNSTILE_SITE_KEY || !turnstileRef.current) return;
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
  }, [enabled]);

  const suggestions = sellOnly
    ? [
        "How do I specify free area vs. face velocity?",
        "Which AMCA 550 storm louver for a coastal opening?",
        "What are Qwik Ship lead times?",
      ]
    : line.slug === "skyfold"
      ? [
          "What system STC can Classic 60 reach?",
          "What support steel must the GC provide?",
          "What power does the wall need?",
        ]
      : [
          `What ratings does ${line.name} carry?`,
          "Which model for my condition?",
          "Typical lead time?",
        ];

  const send = useCallback(
    async (text: string) => {
      const message = text.trim();
      if (!message || busy) return;
      setError(null);
      setBusy(true);
      const history = turns.map((t) => ({ role: t.role, content: t.text }));
      setTurns((prev) => [
        ...prev,
        { role: "user", text: message },
        { role: "assistant", text: "" },
      ]);
      setInput("");

      try {
        const res = await fetch(`/api/agent/${line.slug}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message, sessionId: sessionId.current, turnstileToken, history }),
        });

        if (!res.ok || !res.body) {
          const data = (await res.json().catch(() => ({}))) as { message?: string };
          setError(data.message ?? "The agent is unavailable right now.");
          setTurns((prev) => prev.slice(0, -1)); // drop empty assistant turn
          return;
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const parts = buffer.split("\n\n");
          buffer = parts.pop() ?? "";
          for (const part of parts) {
            const dataLine = part.split("\n").find((l) => l.startsWith("data: "));
            if (!dataLine) continue;
            const ev = JSON.parse(dataLine.slice(6));
            if (ev.type === "delta") {
              setTurns((prev) => {
                const next = [...prev];
                next[next.length - 1] = {
                  ...next[next.length - 1],
                  text: next[next.length - 1].text + ev.text,
                };
                return next;
              });
            } else if (ev.type === "done") {
              setTurns((prev) => {
                const next = [...prev];
                next[next.length - 1] = {
                  ...next[next.length - 1],
                  citations: ev.citations,
                };
                return next;
              });
            } else if (ev.type === "error") {
              setError(ev.message);
            }
          }
        }
      } catch {
        setError("Connection interrupted. Please try again.");
        setTurns((prev) => (prev[prev.length - 1]?.text ? prev : prev.slice(0, -1)));
      } finally {
        setBusy(false);
      }
    },
    [busy, line.slug, line.name, turns, turnstileToken],
  );

  return (
    <section
      aria-label={`Ask the ${line.name} agent`}
      className="border border-hairline bg-surface"
    >
      <div className="flex items-center justify-between border-b border-hairline px-4 py-3">
        <span className="font-mono text-xs uppercase tracking-wide text-ink">
          Ask the {line.name} Agent
        </span>
        <span className="font-mono text-[11px] text-ink-muted">
          {enabled ? "cites source docs" : "coming soon"}
        </span>
      </div>

      <div className="px-4 py-4">
        {!enabled ? (
          <div>
            <p className="text-sm text-ink-muted">
              The {line.name} agent is coming soon. In the meantime, a {" "}
              <a href="/contact/request-quote" className="text-accent hover:underline">
                {line.name} specialist
              </a>{" "}
              can answer your spec questions directly.
            </p>
          </div>
        ) : (
          <>
            <p className="text-sm text-ink-muted">
              Ask about {line.name} specs — ratings, sizes,
              {sellOnly ? " selection, and Qwik Ship lead times." : " structural support, and lead times."}{" "}
              Answers cite the source manufacturer documents.
              {sellOnly && (
                <span className="text-ink">
                  {" "}
                  {line.name} is supplied by us and installed by your contractor.
                </span>
              )}
            </p>

            {/* Conversation transcript, styled as a terminal log. */}
            {turns.length > 0 && (
              <div className="mt-4 space-y-4 border-t border-hairline pt-4">
                {turns.map((t, i) => (
                  <div key={i}>
                    {t.role === "user" ? (
                      <p className="font-mono text-xs text-ink-muted">
                        <span className="text-accent">&gt;</span> {t.text}
                      </p>
                    ) : (
                      <div>
                        <p className="whitespace-pre-wrap text-sm leading-relaxed text-ink">
                          {t.text || (busy && i === turns.length - 1 ? "…" : "")}
                        </p>
                        {t.citations && t.citations.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {t.citations.map((c) => (
                              <span
                                key={c.n}
                                title={c.label}
                                className="inline-flex max-w-[15rem] items-center gap-1 truncate border border-hairline px-2 py-0.5 font-mono text-[10px] text-ink-muted"
                              >
                                <span className="text-accent">[{c.n}]</span>
                                {c.label}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Suggested-question chips (only before the first turn). */}
            {turns.length === 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {suggestions.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => send(q)}
                    className="border border-hairline px-3 py-1.5 text-left font-mono text-[11px] text-ink-muted hover:border-accent hover:text-ink"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {error && (
              <p className="mt-3 border-l-2 border-accent pl-3 text-sm text-ink-muted">
                {error}
              </p>
            )}

            {/* Turnstile widget (renders only when a site key is configured). */}
            <div ref={turnstileRef} className="mt-3 empty:hidden" />

            <form
              className="mt-4 flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={`> ask about ${line.name}…`}
                disabled={busy}
                className="min-w-0 flex-1 border border-hairline bg-canvas px-3 py-2 font-mono text-sm text-ink outline-none focus:border-accent disabled:opacity-60"
                aria-label={`Question for the ${line.name} agent`}
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                className="border border-accent bg-accent px-4 py-2 font-mono text-xs uppercase tracking-wide text-accent-ink hover:opacity-90 disabled:opacity-50"
              >
                {busy ? "…" : "Send"}
              </button>
            </form>

            <div className="mt-3 flex items-center justify-between gap-2">
              <a
                href="/contact/request-quote"
                className="font-mono text-[11px] text-ink-muted hover:text-accent"
              >
                Talk to a {line.name} specialist →
              </a>
              <span className="font-mono text-[10px] text-ink-muted">
                AHJ has final code authority
              </span>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
