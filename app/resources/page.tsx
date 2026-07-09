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
  title: "Resources",
  description:
    "A specifier-forward resource hub — CSI spec library, CAD/BIM, lead-time guidance, AIA CEUs, and an FAQ. Manufacturer docs are linked, never mirrored.",
};

const RESOURCES = [
  {
    href: "/resources/spec-library",
    title: "Spec Library",
    kicker: "By CSI section",
    body: "Current 3-part guide specs per line — 08 43 33, 08 90 00, 10 22 26, 10 22 39, and the IBC §3006 smoke set — linked to the authoritative source.",
  },
  {
    href: "/resources/cad-bim",
    title: "CAD / BIM",
    kicker: "Details & models",
    body: "Manufacturer CAD details and BIM families, plus our coordination drawings for support steel, pockets, and rough openings.",
  },
  {
    href: "/resources/lead-times",
    title: "Lead Times",
    kicker: "Told straight",
    body: "How each line behaves — Airolite Qwik-Ship tiers and honest, quote-confirmed ranges for the custom-manufactured systems.",
  },
  {
    href: "/resources/aia-ceu",
    title: "AIA CEU",
    kicker: "Lunch-and-learn",
    body: "Accredited continuing-education sessions delivered at your office, on your schedule.",
  },
  {
    href: "/resources/faq",
    title: "FAQ",
    kicker: "Common questions",
    body: "Sell-vs-install, coordination, service, and the questions specifiers ask our catalog agents most.",
  },
];

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Everything you need to specify — and nothing you have to distrust."
        lead="A resource hub built for architects and estimators. The rule is simple: we link to the manufacturer's authoritative CAD, BIM, and spec files so they can never go stale on our server, and we host only the dealer value-add you can't get anywhere else."
        crumbs={[{ href: "/", label: "Home" }]}
      />

      <Section eyebrow="Start here" title="The library">
        <CardGrid cols={2}>
          {RESOURCES.map((r) => (
            <Card key={r.href} title={r.title} kicker={r.kicker} href={r.href}>
              {r.body}
            </Card>
          ))}
        </CardGrid>
      </Section>

      <Section eyebrow="How this library works" title="Linked, not mirrored">
        <Prose>
          <p>
            Manufacturers update their specs, CAD, and BIM continuously. A dealer
            who mirrors those files inevitably serves a stale copy — the exact
            failure mode a specifier can least afford. So we link to the source
            for anything the manufacturer maintains, and we host only what we add
            ourselves: readiness checklists, coordination drawings, and selection
            guides.
          </p>
        </Prose>
        <div className="mt-8">
          <Callout label="Every spec claim is sourced">
            The same discipline runs through the whole site. Product-page numbers
            are served from a versioned parameter store, each fact tagged with
            its source document, and the catalog agents cite the document behind
            every answer. If we can&apos;t cite it, we don&apos;t state it.
          </Callout>
        </div>
      </Section>

      <CtaBand
        title="Can't find the document you need?"
        body="Tell us the line and the detail. We will point you to the authoritative file or send the dealer resource directly."
        primary={{ href: "/contact/request-quote", label: "Ask us" }}
        secondary={{ href: "/solutions", label: "Browse solutions" }}
      />
    </>
  );
}
