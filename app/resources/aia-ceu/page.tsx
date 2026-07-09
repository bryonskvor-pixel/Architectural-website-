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
  title: "AIA CEU / Lunch-and-Learn",
  description:
    "Accredited AIA continuing-education sessions on specialty walls, glass systems, and life-safety code — delivered at your office, on your schedule.",
};

const TOPICS = [
  {
    title: "Operable partition acoustics",
    kicker: "Space flexibility",
    body: "System STC vs. panel STC, how flanking paths defeat a good wall, and specifying to the number the room actually needs. Covers Modernfold and Skyfold.",
  },
  {
    title: "Elevator-lobby smoke containment",
    kicker: "Life safety",
    body: "IBC §3006 and §717/§710, UL 1784 and UL 10D listings, and how invisible-until-deployed smoke curtains keep the design intent. Covers Smoke Guard.",
  },
  {
    title: "Disappearing glass walls",
    kicker: "Glass systems",
    body: "Folding, sliding, and pivoting glass — panel sizes, sightlines, flush sills, thermal performance, and impact/HVHZ ratings. Covers Euro-Wall.",
  },
  {
    title: "Specifying louvers",
    kicker: "Louvers & sun control",
    body: "Free area vs. water penetration, AMCA 500-L/540/550 ratings, sizing conventions, and reading the beginning point of water penetration. Covers Airolite.",
  },
];

export default function AiaCeuPage() {
  return (
    <>
      <PageHero
        eyebrow="Resources · Continuing education"
        title="Bring an accredited CEU to your studio."
        lead="Continuing education is where architects do their product research. We deliver AIA-accredited lunch-and-learns at your office — real technical depth on the systems we carry, taught by the people who specify, install, and service them."
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/resources", label: "Resources" },
        ]}
      />

      <Section eyebrow="Course topics" title="Pick a subject">
        <CardGrid cols={2}>
          {TOPICS.map((t) => (
            <Card key={t.title} title={t.title} kicker={t.kicker}>
              {t.body}
            </Card>
          ))}
        </CardGrid>
        <p className="mt-4 max-w-2xl text-sm text-ink-muted">
          Several manufacturers we carry also publish their own AIA-accredited
          courses (for example, Euro-Wall&apos;s LU/HSW catalog). Ask and we
          will point you to the current accredited course or deliver a session
          in person.
        </p>
      </Section>

      <Section eyebrow="How it works" title="Lunch on us, learning units for you">
        <Prose>
          <p>
            Tell us a date, a headcount, and a topic. We bring lunch, the
            presentation, and the paperwork — you and your team leave with the
            learning units and a working understanding of how these systems get
            specified and coordinated.
          </p>
        </Prose>
        <div className="mt-8">
          <Callout label="Book a session">
            Sessions run at your office across {activeBrand.region}. The online
            booking flow is a Phase 1.5 addition — for now, request a date and we
            will confirm directly.{" "}
            <a href="/contact/book-lunch-and-learn">Book a lunch-and-learn →</a>
          </Callout>
        </div>
      </Section>

      <CtaBand
        title="Ready to schedule?"
        body="Send a couple of dates and your topic of interest — we'll lock it in."
        primary={{
          href: "/contact/book-lunch-and-learn",
          label: "Book a lunch-and-learn",
        }}
        secondary={{ href: "/process/design-assist", label: "Design Assist" }}
      />
    </>
  );
}
