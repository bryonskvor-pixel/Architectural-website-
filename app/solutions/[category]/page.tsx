import { notFound } from "next/navigation";
import {
  solutionCategories,
  getCategory,
  productLines,
  type CategorySlug,
} from "@/lib/products";
import { SpecBand, CsiChip } from "@/components/SpecBand";
import { FulfillmentBadge } from "@/components/FulfillmentBadge";
import {
  PageHero,
  Section,
  Prose,
  CtaBand,
} from "@/components/Marketing";

export function generateStaticParams() {
  return solutionCategories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = getCategory(category);
  return {
    title: cat?.title ?? "Solutions",
    description: cat?.blurb,
  };
}

/** Honest, category-level selection guidance (no invented numbers). */
const GUIDANCE: Record<CategorySlug, string[]> = {
  "space-flexibility": [
    "Two ways to divide a room on demand. Modernfold operable partitions are floor-supported and stack to a pocket — the workhorse for classrooms, ballrooms, and conference divides. Skyfold retracts vertically into the ceiling with no floor track at all, ideal where a clean floor and a wall that disappears matter most.",
    "Choose on three axes: the acoustic separation you need (specify to system STC, not panel STC), the ceiling height and structure available, and whether a floor track is acceptable. The catalog agent on each page answers the specifics with citations.",
  ],
  "glass-wall-systems": [
    "Folding, sliding, and pivoting glass walls for the openings a project is remembered by — indoor-outdoor living, storefronts, and signature entries. The decision is driven by opening size, configuration, sightline width, sill type (flush for accessibility vs. weather-rated for exposure), and thermal and impact performance.",
    "For coastal and high-velocity hurricane zones, confirm the specific product's impact and design-pressure approvals for your exact configuration — the agent can pull the current numbers.",
  ],
  "fire-smoke-containment": [
    "Code-driven opening protection that stays invisible until it deploys. Smoke Guard curtains address elevator-lobby smoke containment (IBC §3006) and rated opening conditions without the visual and spatial cost of traditional construction.",
    "Selection starts from the code condition and the opening size, then the model. Final code determination always rests with your AHJ and design team — the agent will answer the spec and defer the ruling.",
  ],
  "louvers-sun-control": [
    "Architectural louvers, grilles, sun controls, and equipment screens — supplied fast. The core trade-off is free area (how much air passes) against water penetration (how much weather is stopped); AMCA 500-L/540/550 data quantifies both.",
    "This line is supply-only: we furnish the product with fast, accurate takeoffs, and your contractor installs it. CTAs route to a takeoff request rather than a field measure.",
  ],
};

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) notFound();

  const guidance = GUIDANCE[cat.slug];

  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title={cat.title}
        lead={cat.blurb}
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/solutions", label: "Solutions" },
        ]}
      />

      <Section
        eyebrow={`${cat.lines.length} line${cat.lines.length > 1 ? "s" : ""}`}
        title="In this category"
      >
        <div className="space-y-10">
          {cat.lines.map((slug) => {
            const line = productLines[slug];
            return (
              <div key={slug} className="border border-hairline">
                <a
                  href={`/solutions/${cat.slug}/${line.slug}`}
                  className="flex flex-wrap items-center justify-between gap-4 border-b border-hairline p-6 no-underline transition-colors hover:bg-surface"
                >
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="font-serif text-2xl text-ink">
                        {line.name}
                        <span className="ml-1.5 text-accent">↗</span>
                      </h3>
                      <CsiChip csi={line.csi} />
                    </div>
                    <p className="mt-2 text-sm text-ink-muted">
                      {line.tagline}
                    </p>
                  </div>
                  <FulfillmentBadge line={line} />
                </a>
                <div className="p-6">
                  <SpecBand facts={line.ataGlance} />
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      <Section eyebrow="How to choose" title="Selecting within this category">
        <Prose>
          {guidance.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </Prose>
      </Section>

      <CtaBand
        title={`Have a ${cat.title.toLowerCase()} condition to solve?`}
        body="Send the opening and the performance target — we'll help you land on the right system and hand back the spec data to match."
        primary={{ href: "/contact/request-quote", label: "Request a quote" }}
        secondary={{ href: "/resources/spec-library", label: "Spec library" }}
      />
    </>
  );
}
