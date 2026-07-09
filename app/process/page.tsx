import { activeBrand } from "@/lib/brand";
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
  title: "Process",
  description:
    "One accountable team from design through service — bid, preconstruction, field measure, factory-trained install, and lifetime service.",
};

/** The full dealer-installer pipeline — the company's core differentiator. */
const PIPELINE = [
  {
    title: "Bid & spec",
    body: "We help write or vet the specification at design development, confirm CSI sections and ratings, and return a clean, complete bid — so the number the GC carries is the number the job costs.",
    meta: "Architect + estimator",
  },
  {
    title: "Preconstruction",
    body: "Submittals, shop drawings, and structural/electrical coordination. We tell the GC exactly what to provide — support steel, backing, pocket framing, power — and when, so nothing blocks our crew at install.",
    meta: "GC + trades",
  },
  {
    title: "Field measure",
    body: "We measure the actual opening once the structure is up — never off the drawings alone. Verified dimensions and site conditions go back to the factory before anything is cut.",
    meta: "Our crew on site",
  },
  {
    title: "Factory-trained install",
    body: "Our own factory-certified installers set the system to the manufacturer's tolerances and commission it. One crew, accountable for the result — not a subcontracted unknown.",
    meta: "Our crew on site",
  },
  {
    title: "Lifetime service",
    body: "An in-house service division maintains and repairs the systems we install — and systems other people installed. Drop-tests, adjustments, parts, and inspections for the life of the building.",
    meta: "Service division",
  },
];

const TRACKS = [
  {
    title: "Design Assist",
    kicker: "For architects & spec writers",
    href: "/process/design-assist",
    body: "Spec language, CSI sections, CAD/BIM, and AIA-accredited lunch-and-learns — support where the decision actually gets made.",
  },
  {
    title: "Preconstruction + Install",
    kicker: "For GCs & estimators",
    href: "/process/preconstruction-install",
    body: "Clean scope, structural coordination, honest lead times, on-time field measure and factory-trained install.",
  },
  {
    title: "Service",
    kicker: "For owners & facilities",
    href: "/process/service",
    body: "In-house maintenance and repair for every brand we carry — regardless of who originally supplied it.",
  },
];

export default function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="Process"
        title="One accountable team, from the first spec to the last service call."
        lead={`Most specialty scopes fail at the handoffs — supplier blames installer, installer blames the drawings, and the GC eats the delay. ${activeBrand.name} owns the whole chain: bid, preconstruction, field measure, factory-trained install, and lifetime service. One team, one number, one point of accountability.`}
        crumbs={[{ href: "/", label: "Home" }]}
      />

      <Section
        eyebrow="The pipeline"
        title="Bid → preconstruction → field measure → install → service"
      >
        <NumberedSteps steps={PIPELINE} />
        <div className="mt-8">
          <Callout label="Sell-only lines are different — on purpose">
            Airolite louvers are <span className="text-ink">supply-only</span>:
            we furnish the product, your contractor installs it. Those scopes
            skip the field-measure and install steps above and route to a
            takeoff instead of a field measure — the same honesty everywhere
            else on the site, gated structurally, never fudged.
          </Callout>
        </div>
      </Section>

      <Section
        eyebrow="Why it matters"
        title="No finger-pointing between supplier and installer"
      >
        <Prose>
          <p>
            When one company specifies, supplies, measures, installs, and
            services a system, there is no seam for a problem to hide in. The
            person who wrote the submittal is the person who coordinates the
            support steel, and the crew that sets the wall is factory-trained on
            it. If something needs adjusting three years later, the same
            organization picks up the phone.
          </p>
          <p>
            That is the difference between a distributor who drop-ships a crate
            and a partner who is accountable for the opening working — on the day
            it is commissioned and for the life of the building.
          </p>
        </Prose>
      </Section>

      <Section eyebrow="Choose your track" title="Where do you sit on the job?">
        <CardGrid cols={3}>
          {TRACKS.map((t) => (
            <Card
              key={t.href}
              title={t.title}
              kicker={t.kicker}
              href={t.href}
            >
              {t.body}
            </Card>
          ))}
        </CardGrid>
      </Section>

      <CtaBand
        title="Have a specialty scope on the boards?"
        body="Send the section, the opening, or the whole drawing set. We will help you specify it right and hand back a clean bid."
        primary={{ href: "/contact/request-quote", label: "Request a quote" }}
        secondary={{ href: "/resources/spec-library", label: "Spec library" }}
      />
    </>
  );
}
