"use client";

import { useState } from "react";
import type { ProductLine } from "@/lib/products";
import { isSellOnly } from "@/lib/products";

/**
 * "Ask the [Line] Agent" — styled as a precise technical console / "catalog
 * terminal" (plan Part 5.2), NOT a cartoon chat bubble. Docked on each product
 * page. Suggested-question chips seed the interaction and steer on-scope.
 *
 * SCAFFOLD STUB: this renders the UI and the intended request shape but does
 * NOT call the model. Wiring to /api/agent/[brand] (streaming, citation chips,
 * Turnstile gate, human-escalation) lands in the agent session. See CLAUDE.md
 * § Agents and /lib/agents/*.
 */
export function AgentPanel({ line }: { line: ProductLine }) {
  const [message, setMessage] = useState("");
  const sellOnly = isSellOnly(line);

  const suggestions = sellOnly
    ? [
        "How do I specify free area vs. face velocity?",
        "Which AMCA 550 storm louver for this opening?",
        "What are Qwik Ship lead times?",
      ]
    : [
        `What STC can ${line.name} reach?`,
        "What must the GC provide for install?",
        "Lead time for a typical opening?",
      ];

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
          cites {line.name} spec data
        </span>
      </div>

      <div className="px-4 py-4">
        <p className="text-sm text-ink-muted">
          Ask about {line.name} specs — ratings, sizes,
          {sellOnly ? " selection, and Qwik Ship lead times." : " structural support, and lead times."}
          {" "}Answers cite the source manufacturer documents.
          {sellOnly && (
            <>
              {" "}
              <span className="text-ink">
                {line.name} is supplied by us and installed by your contractor.
              </span>
            </>
          )}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {suggestions.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => setMessage(q)}
              className="border border-hairline px-3 py-1.5 text-left font-mono text-[11px] text-ink-muted hover:border-accent hover:text-ink"
            >
              {q}
            </button>
          ))}
        </div>

        <form
          className="mt-4 flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            // TODO(agent-session): POST to /api/agent/[brand] with Turnstile
            // token; stream the response; render citation chips + escalation.
          }}
        >
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={`> ask about ${line.name}…`}
            className="min-w-0 flex-1 border border-hairline bg-canvas px-3 py-2 font-mono text-sm text-ink outline-none focus:border-accent"
            aria-label={`Question for the ${line.name} agent`}
          />
          <button
            type="submit"
            disabled
            title="Agent wiring lands in a later session"
            className="border border-hairline px-4 py-2 font-mono text-xs uppercase tracking-wide text-ink-muted"
          >
            Send
          </button>
        </form>

        <p className="mt-3 font-mono text-[11px] text-ink-muted">
          Not yet wired — scaffold UI only. Final code determinations rest with
          your AHJ and design team.
        </p>
      </div>
    </section>
  );
}
