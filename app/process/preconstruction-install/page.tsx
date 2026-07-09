import { activeBrand } from "@/lib/brand";
import {
  PageHero,
  Section,
  Prose,
  NumberedSteps,
  Checklist,
  Callout,
  CtaBand,
} from "@/components/Marketing";

export const metadata = {
  title: "Preconstruction + Install",
  description:
    "Accurate budgets, clean scope, structural coordination, honest lead times, and on-time factory-trained install for GCs and estimators.",
};

const SEQUENCE = [
  {
    title: "Scope & budget",
    body: "A complete bid with the scope drawn tight — what is in, what is by others, and what the opening actually needs. No allowances that balloon at buyout.",
    meta: "Bid",
  },
  {
    title: "Submittals & shop drawings",
    body: "Product data, samples, and coordination drawings turned around on your submittal schedule, dimensioned so the other trades know exactly what to leave us.",
    meta: "Preconstruction",
  },
  {
    title: "Structural & electrical coordination",
    body: "We hand you a written punch of what to provide and when — support steel to the manufacturer's load and deflection criteria, backing, pocket framing, and power — before your framers and steel are on site.",
    meta: "Preconstruction",
  },
  {
    title: "Field measure",
    body: "We measure the built opening once the structure is up. Verified dimensions and conditions go to the factory before fabrication — the single biggest defense against a system that does not fit.",
    meta: "Field",
  },
  {
    title: "Factory-trained install & commissioning",
    body: "Our own certified crew sets and commissions the system to spec, then walks it with you. One accountable installer, not a subcontracted unknown.",
    meta: "Field",
  },
];

const GC_PROVIDES = [
  {
    label: "Structural support",
    detail:
      "Overhead steel or header, engineered and furnished by others to the manufacturer's published load and deflection criteria — we give you the numbers.",
  },
  {
    label: "Rough openings & pockets",
    detail:
      "Framed openings, storage pockets, and closures dimensioned to our coordination drawings.",
  },
  {
    label: "Electrical",
    detail:
      "Power and any low-voltage / fire-alarm interface rough-in brought to the locations on our drawings.",
  },
  {
    label: "Access & schedule",
    detail:
      "A dried-in, structurally complete opening and crew access at the field-measure and install dates we confirm together.",
  },
];

export default function PreconstructionInstallPage() {
  return (
    <>
      <PageHero
        eyebrow="Process · For GCs & estimators"
        title="Accurate budgets, clean scope, and an install that lands on schedule."
        lead="Specialty scopes are small line items with outsized delay risk — a mismeasured wall or missing support steel can hold a certificate of occupancy. We take that risk off your critical path with tight preconstruction, written coordination, and a factory-trained crew that measures before it builds."
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/process", label: "Process" },
        ]}
      />

      <Section eyebrow="The sequence" title="From buyout to commissioned opening">
        <NumberedSteps steps={SEQUENCE} />
      </Section>

      <Section
        eyebrow="Coordination"
        title="What we need from you — in writing, up front"
      >
        <Prose>
          <p>
            The fastest way to blow a specialty install is to discover the
            support steel or power was never provided. We hand you the checklist
            at preconstruction, not at install, so it lands in your coordination
            meetings while there is still time to act.
          </p>
        </Prose>
        <div className="mt-8">
          <Checklist items={GC_PROVIDES} />
        </div>
        <p className="mt-4 max-w-2xl text-sm text-ink-muted">
          Exact requirements are per-system and per-opening — each product page
          carries the specific structural, electrical, and pocket criteria,
          pulled from the manufacturer&apos;s current data.
        </p>
      </Section>

      <Section eyebrow="Lead times" title="Told straight, confirmed at quote">
        <Callout label="No surprises">
          These are custom-manufactured systems — lead time depends on the model,
          size, finish, and current factory backlog. We give you the real number
          at quote and flag long-lead items early so they land in your
          procurement log, not your delay claim. See the{" "}
          <a href="/resources/lead-times">lead-time guide</a> for how each line
          behaves.
        </Callout>
      </Section>

      <CtaBand
        title={`Building it? Get ${activeBrand.name} on the schedule.`}
        body="Send the plans or the specialty scope and we will return a clean bid, the coordination requirements, and honest lead times."
        primary={{ href: "/contact/request-quote", label: "Request a quote" }}
        secondary={{ href: "/resources/lead-times", label: "Lead times" }}
      />
    </>
  );
}
