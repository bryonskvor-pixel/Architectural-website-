import Link from "next/link";
import { activeBrand } from "@/lib/brand";
import { solutionCategories, productLines } from "@/lib/products";
import { CsiChip } from "@/components/SpecBand";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Home. Leads with the positioning statement and the four value pillars
 * (plan Part 1), then routes into the problem/solution categories. The
 * five-agent differentiator is surfaced but the agents live on the product
 * pages. Motion: rise-in choreography above the fold, scroll reveals below —
 * transform/opacity only, inert under reduced motion (plan Part 5.3).
 */
export default function HomePage() {
  return (
    <>
      <section className="border-b border-hairline">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <p className="rise-in font-mono text-xs uppercase tracking-wide text-ink-muted">
            Division 08 + 10 specialty architectural products · {activeBrand.region}
          </p>
          <h1
            className="rise-in mt-6 max-w-4xl font-serif text-5xl leading-[1.05] text-ink md:text-7xl"
            style={{ "--rise-delay": "90ms" } as React.CSSProperties}
          >
            The technical resource for specifying, supplying, and installing
            specialty walls, doors, and life-safety systems.
          </h1>
          <p
            className="rise-in mt-6 max-w-2xl text-xl text-ink-muted"
            style={{ "--rise-delay": "180ms" } as React.CSSProperties}
          >
            {activeBrand.positioning}
          </p>
          <div
            className="rise-in mt-9 flex flex-wrap gap-3"
            style={{ "--rise-delay": "270ms" } as React.CSSProperties}
          >
            <Link
              href="/solutions"
              className="border border-accent bg-accent px-6 py-3 font-mono text-xs uppercase tracking-wide text-accent-ink no-underline transition-[opacity,transform] duration-200 hover:-translate-y-px hover:opacity-90"
            >
              Explore solutions
            </Link>
            <Link
              href="/resources/spec-library"
              className="border border-hairline px-6 py-3 font-mono text-xs uppercase tracking-wide text-ink no-underline transition-[border-color,transform] duration-200 hover:-translate-y-px hover:border-accent"
            >
              Spec library
            </Link>
          </div>
        </div>
      </section>

      {/* Value pillars — plan Part 1.2 */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-px border border-hairline bg-hairline md:grid-cols-2">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={i * 70} className="h-full">
              <div className="h-full bg-canvas p-8">
                <h2 className="font-serif text-2xl text-ink">{p.title}</h2>
                <p className="mt-3 text-ink-muted">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Solutions by problem category — plan Part 2 */}
      <section className="mx-auto max-w-6xl px-6 py-8">
        <Reveal>
          <h2 className="mb-8 font-mono text-xs uppercase tracking-wide text-ink-muted">
            Solutions by problem
          </h2>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2">
          {solutionCategories.map((cat, i) => (
            <Reveal key={cat.slug} delay={i * 80} className="h-full">
              <Link
                href={`/solutions/${cat.slug}`}
                className="card-sweep group block h-full border border-hairline p-8 no-underline transition-colors hover:border-accent"
              >
                <h3 className="font-serif text-2xl text-ink">
                  {cat.title}
                  <span className="ml-1.5 inline-block text-accent opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-x-0.5 group-hover:opacity-100">
                    ↗
                  </span>
                </h3>
                <p className="mt-2 text-ink-muted">{cat.blurb}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {cat.lines.map((slug) => {
                    const line = productLines[slug];
                    return (
                      <span
                        key={slug}
                        className="inline-flex items-center gap-2 border border-hairline px-2.5 py-1 font-mono text-[11px] text-ink-muted"
                      >
                        {line.name}
                        <span className="text-hairline">·</span>
                        <CsiChip csi={line.csi} />
                      </span>
                    );
                  })}
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Agent differentiator — plan Part 4 */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <Reveal>
          <div className="border border-hairline bg-surface p-10">
            <p className="font-mono text-xs uppercase tracking-wide text-ink-muted">
              The differentiator
            </p>
            <h2 className="mt-4 max-w-3xl font-serif text-3xl text-ink">
              Five per-line catalog agents. Interrogate real manufacturer spec
              data — with citations.
            </h2>
            <p className="mt-4 max-w-2xl text-ink-muted">
              Each product line has an on-page technical agent scoped to that
              brand&apos;s documents. Ask about ratings, sizes, structural
              requirements, and lead times; every answer cites its source.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {Object.values(productLines).map((line) => (
                <Link
                  key={line.slug}
                  href={`/solutions/${line.category}/${line.slug}`}
                  className="inline-flex items-center gap-2 border border-hairline px-3 py-1.5 font-mono text-[11px] text-ink no-underline transition-[border-color,transform] duration-200 hover:-translate-y-px hover:border-accent"
                >
                  Ask the {line.name} Agent
                  {line.fulfillment === "sell-only" && (
                    <span className="text-ink-muted">(supply only)</span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}

const PILLARS = [
  {
    title: "Specify with confidence.",
    body: "Real spec data, CAD/BIM, STC/fire ratings, and structural requirements — plus an AI catalog agent per line that answers technical questions instantly, with citations.",
  },
  {
    title: "One accountable team, design through service.",
    body: "Bid → preconstruction → field measure → factory-trained install → lifetime service. No finger-pointing between supplier and installer.",
  },
  {
    title: "Regional presence, factory-trained expertise.",
    body: "Ohio-based, serving Ohio and surrounding regions, factory-certified on every line we install.",
  },
  {
    title: "The right system, not just a sale.",
    body: "Consultative selection across five complementary lines — and an honest “Airolite we supply; you install.”",
  },
];
