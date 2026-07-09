import { solutionCategories, productLines } from "@/lib/products";
import { CsiChip } from "@/components/SpecBand";
import { FulfillmentBadge } from "@/components/FulfillmentBadge";
import {
  PageHero,
  Section,
  Prose,
  Callout,
  CtaBand,
} from "@/components/Marketing";

export const metadata = {
  title: "Solutions",
  description:
    "Specialty Division 08 and 10 systems organized by the problem you're solving — space flexibility, glass walls, fire/smoke containment, and louvers/sun control.",
};

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title="Organized by the problem you're solving — not by our catalog."
        lead="Architects and estimators don't shop by brand; they shop by the condition on the drawing. So we group five complementary product lines under the four problems they solve, and let you drill straight to the spec data, ratings, and on-page catalog agent for each."
        crumbs={[{ href: "/", label: "Home" }]}
      />

      {solutionCategories.map((cat, idx) => (
        <Section
          key={cat.slug}
          eyebrow={`0${idx + 1} · ${cat.lines.length} line${cat.lines.length > 1 ? "s" : ""}`}
          title={cat.title}
        >
          <p className="-mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">
            {cat.blurb}
          </p>
          <div className="mt-8 grid gap-px border border-hairline bg-hairline">
            {cat.lines.map((slug) => {
              const line = productLines[slug];
              return (
                <a
                  key={slug}
                  href={`/solutions/${cat.slug}/${line.slug}`}
                  className="flex flex-wrap items-center justify-between gap-4 bg-canvas p-6 no-underline transition-colors hover:bg-surface"
                >
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="font-serif text-2xl text-ink">
                        {line.name}
                        <span className="ml-1.5 text-accent">↗</span>
                      </h3>
                      <CsiChip csi={line.csi} />
                    </div>
                    <p className="mt-2 text-sm text-ink-muted">{line.tagline}</p>
                  </div>
                  <FulfillmentBadge line={line} />
                </a>
              );
            })}
          </div>
        </Section>
      ))}

      <Section eyebrow="One team across all five" title="The through-line">
        <Prose>
          <p>
            The lines are complementary by design — an operable partition, a
            retractable acoustic wall, a folding glass wall, a code-driven smoke
            curtain, and architectural louvers all show up on the same building.
            Carrying them together means one consultative selection, one bid, and
            one accountable team through install and service.
          </p>
        </Prose>
        <div className="mt-8">
          <Callout label="Sell-vs-install, stated plainly">
            Four lines we supply, install, and service. Airolite we supply;
            you install. That distinction is built into the structure of the
            site — the badge, the CTAs, and the agent&apos;s scope all follow it,
            so you always know exactly what you&apos;re buying.
          </Callout>
        </div>
      </Section>

      <CtaBand
        title="Know the condition but not the system?"
        body="Describe the opening — the performance target, the code driver, the size. We'll help you land on the right line."
        primary={{ href: "/contact/request-quote", label: "Request a quote" }}
        secondary={{ href: "/process/design-assist", label: "Design Assist" }}
      />
    </>
  );
}
