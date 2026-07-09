import {
  PageHero,
  Section,
  Prose,
  NumberedSteps,
  Callout,
  CtaBand,
} from "@/components/Marketing";

export const metadata = {
  title: "Book a Lunch-and-Learn",
  description:
    "Request an AIA-accredited lunch-and-learn at your firm — pick a topic and a date, and we bring lunch and the learning units.",
};

const TOPICS = [
  "Operable partition acoustics (system STC vs. panel STC)",
  "Elevator-lobby smoke containment (IBC §3006, UL 1784 / UL 10D)",
  "Disappearing glass walls (sizes, sightlines, sills, impact ratings)",
  "Specifying louvers (free area vs. water penetration, AMCA ratings)",
];

const STEPS = [
  {
    title: "Tell us your topic and dates",
    body: "Send a couple of preferred dates, an approximate headcount, and the topic your team is most interested in.",
  },
  {
    title: "We confirm and prepare",
    body: "We lock the date, handle the AIA paperwork, and tailor the session to the systems and code conditions your projects actually hit.",
  },
  {
    title: "We deliver — lunch included",
    body: "A working session at your office. Your team leaves with the learning units and a real understanding of how these systems get specified and coordinated.",
  },
];

/** Route through the working RFQ intake with a lunch-and-learn context (the
 *  dedicated scheduling flow is Phase 1.5). The form prefills the message from
 *  `topic` and tags the lead with `source`. */
const REQUEST_HREF =
  "/contact/request-quote?source=lunch-and-learn&topic=" +
  encodeURIComponent("I'd like to book an AIA lunch-and-learn");

export default function BookLunchAndLearnPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact · Continuing education"
        title="Book an AIA lunch-and-learn at your firm."
        lead="Continuing education is where architects do their real product research. Bring an accredited session to your office — you pick the topic and the date, we bring lunch and the learning units."
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/contact", label: "Contact" },
        ]}
      />

      <Section eyebrow="Popular topics" title="What we'll cover">
        <ul className="divide-y divide-hairline border-y border-hairline">
          {TOPICS.map((t) => (
            <li key={t} className="flex gap-4 py-4">
              <span className="mt-0.5 font-mono text-xs text-accent">CEU</span>
              <span className="text-ink">{t}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 max-w-2xl text-sm text-ink-muted">
          Have a different subject in mind? Ask — we&apos;ll tailor a session, or
          point you to the manufacturer&apos;s accredited course.{" "}
          <a href="/resources/aia-ceu" className="text-accent hover:underline">
            More on our CEUs →
          </a>
        </p>
      </Section>

      <Section eyebrow="How it works" title="Three steps to scheduled">
        <NumberedSteps steps={STEPS} />
        <div className="mt-8">
          <Callout label="Scheduling — Phase 1.5">
            A dedicated online booking calendar is coming in Phase 1.5. For now,
            send your request through the form below and we&apos;ll confirm a
            date directly — same team, same day-of experience.
          </Callout>
        </div>
      </Section>

      <CtaBand
        title="Ready to schedule a session?"
        body="Send your preferred topic and a couple of dates. We'll confirm and handle the rest."
        primary={{ href: REQUEST_HREF, label: "Request a lunch-and-learn" }}
        secondary={{ href: "/resources/aia-ceu", label: "Course topics" }}
      />
    </>
  );
}
