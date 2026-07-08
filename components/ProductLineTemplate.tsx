import Link from "next/link";
import type { ProductLine } from "@/lib/products";
import { isSellOnly } from "@/lib/products";
import { SectionCutHeader } from "@/components/SectionCutHeader";
import { SpecBand } from "@/components/SpecBand";
import { AgentPanel } from "@/components/AgentPanel";

/**
 * Shared spec-forward product-line template (plan Part 3):
 *   hero → at-a-glance spec band → applications → models/series →
 *   technical data → resources → embedded agent → process cross-link → CTA.
 *
 * Content is PLACEHOLDER for the scaffold. The sell-vs-install distinction is
 * enforced structurally: sell-only lines (Airolite) suppress the install /
 * field-measure process cross-link and route CTAs to "request takeoff" rather
 * than "schedule field measure" (plan Part 2.1).
 */
export function ProductLineTemplate({ line }: { line: ProductLine }) {
  const sellOnly = isSellOnly(line);

  return (
    <article>
      <SectionCutHeader line={line} />

      <div className="mx-auto max-w-6xl px-6">
        <Section id="at-a-glance" title="At a glance">
          <SpecBand facts={line.ataGlance} />
        </Section>

        <div className="grid gap-16 lg:grid-cols-[1fr_380px]">
          <div>
            <Section id="applications" title="Applications">
              <Placeholder>
                Where {line.name} fits — building types, typical conditions, and
                when to choose it over the alternatives. Content lands in the
                per-line content session.
              </Placeholder>
            </Section>

            <Section id="models" title="Models & series">
              <Placeholder>
                {line.name} series/models with the spec facts that differentiate
                them. Numbers will be served authoritatively from the D1
                parameter store (see /lib/retrieval.ts).
              </Placeholder>
            </Section>

            <Section id="technical-data" title="Technical data">
              <Placeholder>
                Acoustic / fire / structural / electrical data — the tables an
                architect specifies from. Confirm CSI {line.csi} and every rating
                against the manufacturer's current 3-part spec at build.
              </Placeholder>
            </Section>

            <Section id="resources" title="Resources">
              <Placeholder>
                Link (don&apos;t mirror) manufacturer CAD/BIM/CSI specs; host only
                the dealer value-add — lead-time notes, regional project photos,
                and the &quot;what the GC must provide&quot; checklist.
              </Placeholder>
            </Section>
          </div>

          {/* Docked agent rail (right-rail desktop; stacks on mobile). */}
          <aside className="lg:sticky lg:top-8 lg:self-start">
            <div className="py-16 lg:py-0">
              <AgentPanel line={line} />
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
              <CtaRow
                primaryHref="/contact/request-quote"
                primaryLabel="Request louver quote / takeoff"
              />
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

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="border-t border-hairline py-16 first:border-t-0">
      <h2 className="mb-6 font-mono text-xs uppercase tracking-wide text-ink-muted">
        {title}
      </h2>
      {children}
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
        className="border border-accent bg-accent px-5 py-2.5 font-mono text-xs uppercase tracking-wide text-accent-ink no-underline hover:opacity-90"
      >
        {primaryLabel}
      </Link>
      {secondaryHref && secondaryLabel && (
        <Link
          href={secondaryHref}
          className="border border-hairline px-5 py-2.5 font-mono text-xs uppercase tracking-wide text-ink no-underline hover:border-accent"
        >
          {secondaryLabel}
        </Link>
      )}
    </div>
  );
}
