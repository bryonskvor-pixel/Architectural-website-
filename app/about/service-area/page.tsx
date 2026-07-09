import { activeBrand } from "@/lib/brand";
import {
  PageHero,
  Section,
  Prose,
  CardGrid,
  Card,
  Callout,
  CtaBand,
} from "@/components/Marketing";

export const metadata = {
  title: "Service Area",
  description:
    "Specialty architectural products across Ohio — Cleveland, Columbus, Akron, Toledo, and surrounding regions. Supply, install, and service.",
};

const METROS = [
  {
    title: "Cleveland",
    kicker: "Northeast Ohio",
    body: "Healthcare, civic, higher-ed, and corporate work across Greater Cleveland — the operable partitions, glass walls, and life-safety systems those building types demand.",
  },
  {
    title: "Columbus",
    kicker: "Central Ohio",
    body: "One of the country's fastest-growing metros — higher education, state and corporate campuses, and hospitality driving specialty Division 08 and 10 scopes.",
  },
  {
    title: "Akron / Canton",
    kicker: "Northeast Ohio",
    body: "Institutional, corporate, and community facilities across the Akron–Canton corridor, served by the same crew and service division.",
  },
  {
    title: "Toledo",
    kicker: "Northwest Ohio",
    body: "Education, healthcare, and civic projects across the Toledo region and the northwest corner of the state.",
  },
];

export default function ServiceAreaPage() {
  return (
    <>
      <PageHero
        eyebrow="About · Service Area"
        title="Specialty scopes, covered across Ohio."
        lead={`${activeBrand.name} is based in Ohio and serves ${activeBrand.region}. We supply, install, and service the systems we carry throughout the state's major metros — and travel for the right project beyond them.`}
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/about", label: "About" },
        ]}
      />

      <Section eyebrow="Where we work" title="Ohio metros we serve">
        <CardGrid cols={2}>
          {METROS.map((m) => (
            <Card key={m.title} title={m.title} kicker={m.kicker}>
              {m.body}
            </Card>
          ))}
        </CardGrid>
        <p className="mt-4 max-w-2xl text-sm text-ink-muted">
          Plus the surrounding Ohio communities between these metros — if
          you&apos;re not sure whether your project falls in our coverage, ask
          and we&apos;ll tell you straight.
        </p>
      </Section>

      <Section eyebrow="Same team, statewide" title="Coverage that doesn't thin out">
        <Prose>
          <p>
            Wherever the project sits, it&apos;s the same accountable team: we
            specify and supply the system, field-measure the built opening,
            install with our factory-trained crew, and service it for the life of
            the building. Local code and inspection nuances get handled by people
            who work in these markets — and code determinations always rest with
            your AHJ and design team.
          </p>
        </Prose>
        <div className="mt-8">
          <Callout label="Regional projects — Phase 2">
            Metro-specific project galleries are part of the Phase 2 portfolio.
            In the meantime, ask for references relevant to your building type
            and market.
          </Callout>
        </div>
      </Section>

      <CtaBand
        title="Have a project in Ohio?"
        body="Tell us the location and the scope — we'll confirm coverage and get you a specialist who works your market."
        primary={{ href: "/contact/request-quote", label: "Request a quote" }}
        secondary={{ href: "/about", label: "About us" }}
      />
    </>
  );
}
