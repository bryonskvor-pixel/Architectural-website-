"use client";

import { useEffect, useRef, useState } from "react";
import type { ProductLine } from "@/lib/products";
import { FulfillmentBadge } from "@/components/FulfillmentBadge";
import { CsiChip } from "@/components/SpecBand";

/**
 * Product-line hero in the "section-cut / drawing" aesthetic (plan Part 5.2):
 * hairline framing, monospace annotations, a spec ticker, and — for operable
 * systems — a scroll-driven micro-animation that echoes the real product motion
 * (Skyfold panels "retract" toward the ceiling line as you scroll).
 *
 * Motion is transform/opacity only and fully yields to prefers-reduced-motion
 * (plan Part 5.3). The effect is subordinate to spec access — it never blocks
 * or delays content.
 */
export function SectionCutHeader({
  line,
  motion = "none",
}: {
  line: ProductLine;
  /** "retract" = panels rise into the ceiling (Skyfold); "none" = static. */
  motion?: "retract" | "none";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [reduced, setReduced] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reduced || motion === "none") return;
    let raf = 0;
    const update = () => {
      const el = ref.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        // 0 when the panel top is at viewport top → 1 as it scrolls a viewport up.
        const p = Math.min(1, Math.max(0, -rect.top / Math.max(1, rect.height)));
        setProgress(p);
      }
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduced, motion]);

  const animate = motion === "retract" && !reduced;

  return (
    <section className="border-b border-hairline">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex flex-wrap items-center gap-3">
          <CsiChip csi={line.csi} />
          <FulfillmentBadge line={line} />
        </div>

        <h1 className="mt-6 max-w-3xl font-serif text-5xl leading-[1.05] text-ink md:text-6xl">
          {line.name}
        </h1>
        <p className="mt-4 max-w-2xl text-xl text-ink-muted">{line.tagline}</p>

        {/* Section-cut image slot with retract motion. Placeholder panels stand
            in for hero photography; the panels translate up + fade toward a
            ceiling line as you scroll. */}
        <div
          ref={ref}
          className="relative mt-10 aspect-[16/7] w-full overflow-hidden border border-hairline bg-surface"
        >
          {/* ceiling line the panels retract toward */}
          <div className="absolute inset-x-0 top-0 h-px bg-hairline" />
          <span className="absolute left-3 top-3 z-10 font-mono text-[11px] text-ink-muted">
            [ hero image — {line.slug}.jpg ]
          </span>

          {/* stacked drawing panels */}
          <div className="absolute inset-0 flex items-end gap-px p-px">
            {Array.from({ length: 6 }).map((_, i) => {
              const stagger = i / 6;
              const lift = animate ? progress * (0.5 + stagger) * 100 : 0;
              const fade = animate ? 1 - progress * (0.4 + stagger * 0.6) : 1;
              return (
                <div
                  key={i}
                  className="flex-1 border-x border-hairline bg-canvas"
                  style={{
                    height: "100%",
                    transform: `translateY(-${lift}%)`,
                    opacity: fade,
                    transition: animate ? "none" : "transform 200ms, opacity 200ms",
                  }}
                  aria-hidden
                />
              );
            })}
          </div>

          <span className="absolute bottom-3 right-3 z-10 font-mono text-[11px] text-ink-muted">
            ⌐ scroll — the wall retracts into the ceiling
          </span>
        </div>

        {/* Monospace spec ticker — key ratings as a data strip (plan Part 5.2). */}
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-t border-hairline pt-4">
          {line.ataGlance.map((f) => (
            <span key={f.label} className="font-mono text-xs text-ink-muted">
              {f.label}: <span className="text-ink">{f.value}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
