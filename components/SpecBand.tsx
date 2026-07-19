import type { SpecFact } from "@/lib/products";
import { Reveal } from "@/components/motion/Reveal";

/**
 * "At a glance" spec band — styled like a drawing title block (plan Part 5.2),
 * key ratings rendered as a monospace data strip (the "instrument" feel).
 * Hairline borders only; no shadows. Facts reveal left-to-right on scroll.
 */
export function SpecBand({ facts }: { facts: SpecFact[] }) {
  return (
    <dl className="grid grid-cols-2 divide-hairline border border-hairline md:grid-cols-4 md:divide-x">
      {facts.map((f, i) => (
        <Reveal
          as="div"
          key={f.label}
          delay={i * 50}
          className="border-t border-hairline px-4 py-4 md:border-t-0"
        >
          <dt className="font-mono text-[11px] uppercase tracking-wide text-ink-muted">
            {f.label}
          </dt>
          <dd className="mt-1 font-mono text-sm text-ink">{f.value}</dd>
        </Reveal>
      ))}
    </dl>
  );
}

/** A single monospace CSI chip for breadcrumbs / wayfinding (plan Part 2.2). */
export function CsiChip({ csi }: { csi: string }) {
  return (
    <span className="inline-flex items-center border border-hairline px-2 py-0.5 font-mono text-[11px] text-ink-muted">
      CSI {csi}
    </span>
  );
}
