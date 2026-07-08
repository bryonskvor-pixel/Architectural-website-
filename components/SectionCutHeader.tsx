import type { ProductLine } from "@/lib/products";
import { FulfillmentBadge } from "@/components/FulfillmentBadge";
import { CsiChip } from "@/components/SpecBand";

/**
 * Product-line hero rendered in the "section-cut / drawing" aesthetic
 * (plan Part 5.2): hairline framing, monospace annotations, elevation-callout
 * feel — over a large-format project image (image slot is a placeholder in the
 * scaffold). Motion (panels retract/fold on scroll) is deferred to the design
 * session and must be transform/opacity + prefers-reduced-motion only.
 */
export function SectionCutHeader({ line }: { line: ProductLine }) {
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

        {/* Large-format architectural image slot (plan Part 5.1). Placeholder:
            a hairline-framed panel with drawing-style dimension annotation. */}
        <div className="relative mt-10 aspect-[16/7] w-full border border-hairline bg-surface">
          <span className="absolute left-3 top-3 font-mono text-[11px] text-ink-muted">
            [ hero image — {line.slug}.jpg ]
          </span>
          <span className="absolute bottom-3 right-3 font-mono text-[11px] text-ink-muted">
            ⌐ full-bleed project photography
          </span>
        </div>
      </div>
    </section>
  );
}
