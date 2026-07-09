import { activeBrand } from "@/lib/brand";
import { PageHero, Section, FaqList, Callout, CtaBand } from "@/components/Marketing";

export const metadata = {
  title: "FAQ",
  description:
    "Common questions from architects and GCs about specifying, coordinating, installing, and servicing specialty Division 08 and 10 systems.",
};

/**
 * Plain-text answers so the same content feeds both the rendered accordion and
 * the FAQPage structured data below. Seeded from the questions specifiers and
 * GCs actually ask — and from recurring catalog-agent questions (the
 * agent-as-content loop: logged questions become FAQ/spec content over time).
 */
const FAQS: { q: string; a: string }[] = [
  {
    q: "Do you install everything you sell?",
    a: `Almost. Four of our five lines — Modernfold, Skyfold, Euro-Wall, and Smoke Guard — we supply, field-measure, install, and service as one accountable team. Airolite louvers are the deliberate exception: we supply them, and they're installed by your contractor. We're explicit about that everywhere so there's never a surprise at buyout.`,
  },
  {
    q: "Why is Airolite supply-only when the others are installed?",
    a: `Louvers are a fabricate-and-ship product that trades and glaziers routinely set, so the value we add is fast, accurate takeoffs and getting the right model to each opening — not a specialty install crew. The operable partitions, retractable walls, glass walls, and smoke curtains are precision mechanical assemblies where a factory-trained install is what makes them perform, so we own that end to end.`,
  },
  {
    q: "What does the GC need to provide for an install line?",
    a: `Typically structural support (overhead steel or a header engineered and furnished by others to the manufacturer's load and deflection criteria), framed rough openings and pockets, and power plus any fire-alarm interface rough-in. We hand you the specific written checklist at preconstruction — not at install — with the numbers for your exact system and opening.`,
  },
  {
    q: "How accurate are the specs on this site?",
    a: `Every product-page number is served from a versioned parameter store and tagged with the source document it came from. The catalog agents cite the document behind every answer, and we link to the manufacturer's current 3-part spec rather than mirror a copy that could drift. If we can't cite it, we don't state it.`,
  },
  {
    q: "What are the catalog agents, and can I trust them?",
    a: `Each product line has an on-page technical agent scoped to that brand's documents. Ask about ratings, sizes, structural requirements, or lead times and it answers with a citation to the source. It's built to refuse out-of-scope questions, won't quote firm pricing, and defers code determinations to your AHJ — for anything beyond its scope it routes you to a human specialist.`,
  },
  {
    q: "What are your lead times?",
    a: `Airolite runs on a Qwik-Ship program with fixed 1/3/5/10/20-day cycles for qualifying standard products. The custom-manufactured lines are quoted per project because lead time depends on submittal approval, size, finish, and factory backlog — we give you the real number at quote and flag long-lead items early.`,
  },
  {
    q: "Do you service systems you didn't install?",
    a: `Yes. Our in-house service division maintains and repairs operable partitions, glass walls, and smoke/fire systems regardless of who originally supplied them — preventive maintenance, repairs, parts, and life-safety drop-testing.`,
  },
  {
    q: "What region do you serve?",
    a: `${activeBrand.name} is based in Ohio and serves ${activeBrand.region}. If you're not sure whether your project is in our area, ask — we'll tell you straight.`,
  },
];

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      {/* FAQPage structured data for discoverability (plan Part 7 / SEO). */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        eyebrow="Resources · FAQ"
        title="The questions specifiers and GCs actually ask."
        lead="Straight answers on sell-vs-install, coordination, spec accuracy, the catalog agents, lead times, and service. Seeded from real conversations — including the questions our agents field most."
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/resources", label: "Resources" },
        ]}
      />

      <Section eyebrow="Common questions" title="Answers">
        <FaqList items={FAQS.map((f) => ({ q: f.q, a: f.a }))} />
        <div className="mt-8">
          <Callout label="Don't see your question?">
            Ask the catalog agent on any{" "}
            <a href="/solutions">product line</a> for a cited spec answer, or
            reach a specialist directly.
          </Callout>
        </div>
      </Section>

      <CtaBand
        title="Still have a question?"
        body="Send it over — a specialist will get you a straight answer."
        primary={{ href: "/contact/request-quote", label: "Ask us" }}
        secondary={{ href: "/process", label: "See our process" }}
      />
    </>
  );
}
