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
  title: "CAD / BIM",
  description:
    "Per-line CAD details and BIM families, linked to the manufacturer's authoritative library — plus our own coordination drawings for support steel, pockets, and rough openings.",
};

/** Manufacturer CAD/BIM roots — linked, never mirrored (files update; we don't want stale copies). */
const CAD_SOURCES: Record<BrandSlug, string> = {
  modernfold: "https://www.modernfold.com",
  skyfold: "https://www.skyfold.com",
  "euro-wall": "https://www.euro-wall.com",
  "smoke-guard": "https://www.smokeguard.com",
  airolite: "https://www.airolite.com",
};

export default function CadBimPage() {
  return (
    <>
      <PageHero
        eyebrow="Resources · CAD / BIM"
        title="CAD details and BIM families — from the source, current."
        lead="Design teams increasingly skip suppliers who can't hand over a BIM object. Every line we carry links straight to the manufacturer's authoritative DWG and Revit library, so the family you place is the one they maintain — and we add the coordination drawings only we can provide."
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/resources", label: "Resources" },
        ]}
      />

      <Section eyebrow="By line" title="Manufacturer CAD & BIM">
        <ul className="divide-y divide-hairline border border-hairline">
          {Object.values(productLines).map((line) => (
            <li
              key={line.slug}
              className="flex flex-col gap-3 px-5 py-5 md:flex-row md:items-center md:justify-between"
            >
              <div className="flex items-center gap-3">
                <span className="font-serif text-xl text-ink">{line.name}</span>
                <CsiChip csi={line.csi} />
              </div>
              <a
                href={CAD_SOURCES[line.slug]}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 border border-hairline px-3 py-1.5 font-mono text-[11px] uppercase tracking-wide text-ink no-underline hover:border-accent"
              >
                CAD / BIM library ↗
              </a>
            </li>
          ))}
        </ul>
      </Section>

      <Section eyebrow="What we host" title="The coordination drawings">
        <Prose>
          <p>
            The manufacturer owns the product geometry; we own the interface with
            your building. For the install lines we host coordination drawings
            that show what the CAD family doesn&apos;t — support-steel loads and
            deflection criteria, pocket and header framing, rough-opening
            tolerances, and power and fire-alarm rough-in locations.
          </p>
          <p>
            Those are the details that keep a specialty system off the critical
            path. Each product page carries the requirements specific to that
            line and opening.
          </p>
        </Prose>
        <div className="mt-8">
          <Callout label="Need a specific detail?">
            If the coordination drawing you need isn&apos;t linked from the
            product page yet, ask — we will send the current file directly.{" "}
            <a href="/contact/request-quote">Request a drawing →</a>
          </Callout>
        </div>
      </Section>

      <CtaBand
        title="Building the model? Pull the right families."
        body="Grab the manufacturer CAD/BIM above, then let us hand you the coordination drawings for your specific openings."
        primary={{ href: "/resources/spec-library", label: "Spec library" }}
        secondary={{ href: "/process/design-assist", label: "Design Assist" }}
      />
    </>
  );
}
