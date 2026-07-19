import Link from "next/link";
import type { ProductLine } from "@/lib/products";
import { isSellOnly } from "@/lib/products";
import { getLineContent } from "@/lib/content";
import { isAgentEnabled } from "@/lib/agents/pilot";
import { SectionCutHeader } from "@/components/SectionCutHeader";
import { Reveal } from "@/components/motion/Reveal";
import { AgentPanel } from "@/components/AgentPanel";
import {
  Applications,
  ModelsTable,
  TechnicalData,
  GcReadinessModule,
  ResourceList,
} from "@/components/ProductSections";

/**
 * Shared spec-forward product-line template (plan Part 3):
 *   hero → at-a-glance spec ticker → applications → models/series →
 *   technical data → GC readiness → finishes → resources → embedded agent →
 *   process cross-link → CTA.
 *
 * A line with authored content (getLineContent) renders the full treatment;
 * otherwise it renders the placeholder scaffold. Skyfold is the Session 2
 * reference. The sell-vs-install distinction is enforced structurally: sell-only
 * lines suppress the GC-readiness module and the install/field-measure
 * cross-link, and route CTAs to "request takeoff" (plan Part 2.1).
 */
export function ProductLineTemplate({ line }: { line: ProductLine }) {
  const sellOnly = isSellOnly(line);
  const content = getLineContent(line.slug);
  // Operable systems echo their real motion in the hero (plan Part 5.2).
  const motion = line.category === "space-flexibility" ? "retract" : "none";

  return (
    <article>
      <SectionCutHeader line={line} motion={motion} />

      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-16 lg:grid-cols-[1fr_380px]">
          <div>
            {content ? (
              <>
                <Section id="overview" title="Overview" first>
                  <p className="max-w-2xl text-lg leading-relaxed text-ink">
                    {content.overview}
                  </p>
                </Section>

                <Section id="applications" title="Applications">
                  <Applications items={content.applications} />
                </Section>

                <Section id="models" title="Models & series">
                  <ModelsTable models={content.models} />
                </Section>

                <Section id="technical-data" title="Technical data">
                  <TechnicalData groups={content.technical} />
                </Section>

                {/* GC readiness — install lines only (plan Part 2.1). */}
                {!sellOnly && content.gcReadiness && (
                  <Section id="gc-readiness" title="GC coordination">
                    <GcReadinessModule data={content.gcReadiness} />
                  </Section>
                )}

                {content.finishes && (
                  <Section id="finishes" title="Finishes">
                    <p className="max-w-2xl text-lg leading-relaxed text-ink">
                      {content.finishes}
                    </p>
                  </Section>
                )}

                <Section id="resources" title="Resources">
                  <ResourceList items={content.resources} />
                </Section>
              </>
            ) : (
              <PlaceholderSections line={line} />
            )}
          </div>

          {/* Docked agent rail (right-rail desktop; stacks on mobile). */}
          <aside className="lg:sticky lg:top-8 lg:self-start">
            <div className="py-16 lg:py-0">
              <AgentPanel line={line} enabled={isAgentEnabled(line.slug)} />
            </div>
          </aside>
        </div>

        {/* Process cross-link — suppressed for sell-only lines (plan Part 2.1). */}
        <Section id="next" title={sellOnly ? "How we supply" : "One accountable team"}>
          {sellOnly ? (
            <div className="border border-hairline bg-surface p-6">
              <p className="text-ink-muted">
                {line.name} is <span className="text-ink">supply-only</span> — we
                furnish the product; your contractor installs. Ask us for a
                takeoff and current lead times.
              </p>
              <CtaRow primaryHref="/contact/request-quote" primaryLabel="Request louver quote / takeoff" />
            </div>
          ) : (
            <div className="border border-hairline bg-surface p-6">
              <p className="text-ink-muted">
                Bid → preconstruction → field measure → factory-trained install →
                lifetime service. No finger-pointing between supplier and
                installer.{" "}
                <Link href="/process" className="text-accent hover:underline">
                  See our process →
                </Link>
              </p>
              <CtaRow
                primaryHref="/contact/request-quote"
                primaryLabel="Request a quote"
                secondaryHref="/process/preconstruction-install"
                secondaryLabel="Schedule a field measure"
              />
            </div>
          )}
        </Section>
      </div>
    </article>
  );
}

function PlaceholderSections({ line }: { line: ProductLine }) {
  return (
    <>
      <Section id="applications" title="Applications" first>
        <Placeholder>
          Where {line.name} fits — building types, typical conditions, and when
          to choose it. Authored content lands in a later session from the
          ingested {line.name} data.
        </Placeholder>
      </Section>
      <Section id="models" title="Models & series">
        <Placeholder>
          {line.name} series with the spec facts that differentiate them, served
          authoritatively from the D1 parameter store.
        </Placeholder>
      </Section>
      <Section id="technical-data" title="Technical data">
        <Placeholder>
          Acoustic / fire / structural / electrical data. Confirm CSI {line.csi}
          {" "}and every rating against the manufacturer&apos;s current 3-part spec.
        </Placeholder>
      </Section>
      <Section id="resources" title="Resources">
        <Placeholder>
          Link manufacturer CAD/BIM/CSI specs; host only the dealer value-add.
        </Placeholder>
      </Section>
    </>
  );
}

function Section({
  id,
  title,
  children,
  first = false,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
  first?: boolean;
}) {
  return (
    <section id={id} className={`py-16 ${first ? "" : "border-t border-hairline"}`}>
      <Reveal>
        <h2 className="mb-6 font-mono text-xs uppercase tracking-wide text-ink-muted">
          {title}
        </h2>
      </Reveal>
      <Reveal delay={80}>{children}</Reveal>
    </section>
  );
}

function Placeholder({ children }: { children: React.ReactNode }) {
  return <p className="max-w-2xl text-lg leading-relaxed text-ink">{children}</p>;
}

function CtaRow({
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: {
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <div className="mt-5 flex flex-wrap gap-3">
      <Link
        href={primaryHref}
        className="border border-accent bg-accent px-5 py-2.5 font-mono text-xs uppercase tracking-wide text-accent-ink no-underline transition-[opacity,transform] duration-200 hover:-translate-y-px hover:opacity-90"
      >
        {primaryLabel}
      </Link>
      {secondaryHref && secondaryLabel && (
        <Link
          href={secondaryHref}
          className="border border-hairline px-5 py-2.5 font-mono text-xs uppercase tracking-wide text-ink no-underline transition-[border-color,transform] duration-200 hover:-translate-y-px hover:border-accent"
        >
          {secondaryLabel}
        </Link>
      )}
    </div>
  );
}
