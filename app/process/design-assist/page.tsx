import { activeBrand } from "@/lib/brand";
import { productLines } from "@/lib/products";
import {
  PageHero,
  Section,
  Prose,
  CardGrid,
  Card,
  NumberedSteps,
  Callout,
  CtaBand,
} from "@/components/Marketing";

export const metadata = {
  title: "Design Assist",
  description:
    "Spec help at design development, CSI language, CAD/BIM, and AIA-accredited lunch-and-learns — support for architects where the decision is actually made.",
};

const STAGES = [
  {
    title: "Early selection",
    body: "Bring us the performance problem — an STC target, a fire/smoke code condition, a 30-foot opening, a hurricane zone — and we help you narrow to the right system across five complementary lines before language is locked.",
    meta: "Schematic → DD",
  },
  {
    title: "Specification",
    body: "We supply current 3-part guide specs and confirm the CSI section, ratings, and structural notes. You get language that matches what actually gets built — not a copy-paste from an out-of-date master.",
    meta: "DD → CD",
  },
  {
    title: "CAD / BIM & submittals",
    body: "Manufacturer-authoritative CAD and BIM, linked (not mirrored) so you always pull the current file, plus coordination drawings for support steel, pockets, and rough openings.",
    meta: "CD → bid",
  },
  {
    title: "AIA lunch-and-learn",
    body: "Accredited continuing-education sessions delivered at your office, on your schedule — the acoustics of operable partitions, elevator-lobby smoke code, or specifying louvers by free area and water penetration.",
    meta: "Any time",
  },
];

export default function DesignAssistPage() {
  return (
    <>
      <PageHero
        eyebrow="Process · For architects & spec writers"
        title="Design Assist — help where the decision actually gets made."
        lead="Specialty Division 08 and 10 scopes are specified long before they are bid. We meet architects at design development with real spec language, authoritative CAD/BIM, and accredited education — so the detail is right the first time and the bid comes back clean."
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/process", label: "Process" },
        ]}
      />

      <Section eyebrow="How we help" title="From selection to a locked, buildable spec">
        <NumberedSteps steps={STAGES} />
      </Section>

      <Section
        eyebrow="Ask the catalog agents"
        title="Interrogate real manufacturer data — with citations"
      >
        <Prose>
          <p>
            Every product line carries an on-page technical agent scoped to that
            brand&apos;s documents. Ask about ratings, sizes, structural
            requirements, and lead times at your desk, at 11pm, mid-detail —
            every answer cites the source document it came from, so you can put
            it straight into a submittal.
          </p>
        </Prose>
        <div className="mt-8">
          <CardGrid cols={3}>
            {Object.values(productLines).map((line) => (
              <Card
                key={line.slug}
                title={line.name}
                kicker={`CSI ${line.csi}`}
                href={`/solutions/${line.category}/${line.slug}`}
              >
                {line.tagline}
                {line.fulfillment === "sell-only" && (
                  <span className="mt-2 block font-mono text-[11px] uppercase tracking-wide text-ink-muted">
                    Supply only
                  </span>
                )}
              </Card>
            ))}
          </CardGrid>
        </div>
      </Section>

      <Section eyebrow="Continuing education" title="Bring a CEU to your studio">
        <Callout label="AIA lunch-and-learn">
          Accredited sessions delivered in your office. Pick a topic — operable
          partition acoustics, IBC §3006 elevator-lobby smoke containment,
          disappearing glass-wall detailing, or louver selection — and we bring
          lunch and the learning units.{" "}
          <a href="/contact/book-lunch-and-learn">Book a lunch-and-learn →</a>
        </Callout>
      </Section>

      <CtaBand
        title={`Put ${activeBrand.name} on your next specialty detail.`}
        body="Send a drawing, a performance target, or a question. We will help you specify it and hand back the CAD, BIM, and spec language to match."
        primary={{ href: "/contact/request-quote", label: "Start a conversation" }}
        secondary={{ href: "/resources/cad-bim", label: "CAD / BIM library" }}
      />
    </>
  );
}
