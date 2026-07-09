import { productLines, type BrandSlug } from "@/lib/products";
import { CsiChip } from "@/components/SpecBand";
import {
  PageHero,
  Section,
  Prose,
  Callout,
  CtaBand,
} from "@/components/Marketing";

export const metadata = {
  title: "Spec Library",
  description:
    "Current 3-part guide specifications by CSI section for every line we carry — linked to the authoritative manufacturer / ARCAT source, never mirrored.",
};

/**
 * Authoritative spec sources per line. We link to the manufacturer and ARCAT so
 * the current guide spec is always the one the specifier pulls — the site never
 * hosts a copy that can drift. Roots only; deep links change, these do not.
 */
const SPEC_SOURCES: Record<BrandSlug, { manufacturer: string; arcat: string }> =
  {
    modernfold: { manufacturer: "https://www.modernfold.com", arcat: "https://www.arcat.com" },
    skyfold: { manufacturer: "https://www.skyfold.com", arcat: "https://www.arcat.com" },
    "euro-wall": { manufacturer: "https://www.euro-wall.com", arcat: "https://www.arcat.com" },
    "smoke-guard": { manufacturer: "https://www.smokeguard.com", arcat: "https://www.arcat.com" },
    airolite: { manufacturer: "https://www.airolite.com", arcat: "https://www.arcat.com" },
  };

export default function SpecLibraryPage() {
  return (
    <>
      <PageHero
        eyebrow="Resources · Spec Library"
        title="Guide specs by CSI section — always the current one."
        lead="Every line we carry, with its primary CSI section and a direct path to the manufacturer's current 3-part specification. We link to the source rather than mirror it, so what you paste into your project manual is never a stale copy."
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/resources", label: "Resources" },
        ]}
      />

      <Section eyebrow="By line" title="Specifications">
        <ul className="divide-y divide-hairline border border-hairline">
          {Object.values(productLines).map((line) => {
            const src = SPEC_SOURCES[line.slug];
            return (
              <li
                key={line.slug}
                className="flex flex-col gap-4 px-5 py-5 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-serif text-xl text-ink">
                      {line.name}
                    </span>
                    <CsiChip csi={line.csi} />
                    {line.fulfillment === "sell-only" && (
                      <span className="border border-hairline px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-ink-muted">
                        Supply only
                      </span>
                    )}
                  </div>
                  <p className="mt-1.5 text-sm text-ink-muted">
                    {line.tagline}
                  </p>
                </div>
                <div className="flex shrink-0 flex-wrap gap-2">
                  <a
                    href={src.arcat}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-hairline px-3 py-1.5 font-mono text-[11px] uppercase tracking-wide text-ink no-underline hover:border-accent"
                  >
                    3-part spec ↗
                  </a>
                  <a
                    href={src.manufacturer}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-hairline px-3 py-1.5 font-mono text-[11px] uppercase tracking-wide text-ink no-underline hover:border-accent"
                  >
                    Manufacturer ↗
                  </a>
                </div>
              </li>
            );
          })}
        </ul>
        <p className="mt-4 max-w-2xl text-sm text-ink-muted">
          CSI sections are the primary designation for each line; confirm the
          exact section and edition against the manufacturer&apos;s current
          published spec before issuing.
        </p>
      </Section>

      <Section eyebrow="Writing the spec" title="Specify it right the first time">
        <Prose>
          <p>
            Need help turning a performance target into buildable language —
            confirming an STC, a fire/smoke listing, a design pressure, or the
            structural notes that belong in the spec? That is exactly what Design
            Assist is for.
          </p>
        </Prose>
        <div className="mt-8">
          <Callout label="On-page catalog agents">
            Each <a href="/solutions">product line</a> carries a technical agent
            scoped to that brand&apos;s documents. Ask it a spec question and it
            answers with a citation to the source document — drop the answer, and
            its reference, straight into your submittal.
          </Callout>
        </div>
      </Section>

      <CtaBand
        title="Specifying a Division 08 or 10 specialty scope?"
        body="Send the section and the condition. We will confirm the spec language and hand back the CAD and BIM to match."
        primary={{ href: "/process/design-assist", label: "Design Assist" }}
        secondary={{ href: "/resources/cad-bim", label: "CAD / BIM" }}
      />
    </>
  );
}
