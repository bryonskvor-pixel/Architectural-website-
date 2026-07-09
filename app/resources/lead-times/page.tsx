import {
  PageHero,
  Section,
  Prose,
  DataTable,
  Checklist,
  Callout,
  CtaBand,
} from "@/components/Marketing";

export const metadata = {
  title: "Lead Times",
  description:
    "How lead times work per line — Airolite's Qwik-Ship 1/3/5/10/20-day program and honest, quote-confirmed ranges for the custom-manufactured systems.",
};

/** Airolite Qwik-Ship cycles — the one line with fixed, published shipping tiers. */
const QWIK_SHIP: string[][] = [
  ["1-day", "Qwik Ship 1", "Fastest tier — qualifying stock configurations"],
  ["3-day", "Qwik Ship 3", "Common sizes and standard finishes"],
  ["5-day", "Qwik Ship 5", "Broader standard selection"],
  ["10-day", "Qwik Ship 10", "Extended standard range"],
  ["20-day", "Qwik Ship 20", "Widest Qwik-Ship-eligible selection"],
];

/** What drives lead time on the custom-manufactured install lines. */
const DRIVERS = [
  {
    label: "Submittal & approval",
    detail:
      "Fabrication doesn't start until shop drawings are approved. Fast, complete submittals are the single biggest lever on schedule.",
  },
  {
    label: "Size & configuration",
    detail:
      "Larger openings, higher STC assemblies, fire-rated options, and complex stacking add fabrication time.",
  },
  {
    label: "Finish",
    detail:
      "Standard finishes ship faster than custom colors, wood species, or special coatings.",
  },
  {
    label: "Factory backlog",
    detail:
      "Manufacturer queue moves with the market — the reason we quote the real number at bid rather than publish a stale one.",
  },
];

export default function LeadTimesPage() {
  return (
    <>
      <PageHero
        eyebrow="Resources · Lead Times"
        title="Lead times, told straight."
        lead="Lead-time honesty is a dealer value-add and a GC trust signal, so we won't publish a number we can't stand behind. Airolite ships on fixed Qwik-Ship cycles; the custom-manufactured lines are quoted per project. Here's how each behaves."
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/resources", label: "Resources" },
        ]}
      />

      <Section
        eyebrow="Airolite · Supply only"
        title="Qwik-Ship — fixed shipping cycles"
      >
        <Prose>
          <p>
            Airolite louvers, grilles, and sun controls run on a Qwik-Ship
            program with fixed cycles for qualifying standard products — one of
            the fastest paths to material in the category. Eligibility depends on
            model, size, and finish; we confirm the tier for your exact takeoff.
          </p>
        </Prose>
        <div className="mt-8">
          <DataTable
            columns={["Cycle", "Program", "Typical scope"]}
            rows={QWIK_SHIP}
            caption="Qwik-Ship cycles are ship-from-factory targets for qualifying standard configurations; non-standard sizes and finishes fall to standard manufacturing lead time. Airolite is supply-only — installed by others."
          />
        </div>
      </Section>

      <Section
        eyebrow="Modernfold · Skyfold · Euro-Wall · Smoke Guard"
        title="Custom-manufactured — quoted per project"
      >
        <Prose>
          <p>
            Operable partitions, retractable walls, folding glass walls, and
            smoke curtains are built to your opening. There is no honest single
            number — lead time depends on the factors below, and we give you the
            real one at quote, then flag long-lead items early so they land in
            your procurement log rather than your delay claim.
          </p>
        </Prose>
        <div className="mt-8">
          <Checklist items={DRIVERS} />
        </div>
        <div className="mt-8">
          <Callout label="Phase 1.5 — a fuller table is coming">
            We&apos;re building a per-line typical-range table from our own
            project history. Until it lands, ask for a specific line and size and
            we&apos;ll give you the current number.
          </Callout>
        </div>
      </Section>

      <CtaBand
        title="Need a real date for a real opening?"
        body="Send the line, size, and finish. We'll confirm the current lead time and the long-lead items to watch."
        primary={{ href: "/contact/request-quote", label: "Get a lead time" }}
        secondary={{ href: "/process/preconstruction-install", label: "How install works" }}
      />
    </>
  );
}
