import { activeBrand } from "@/lib/brand";
import { productLines } from "@/lib/products";
import { team } from "@/lib/content/team";
import { CsiChip } from "@/components/SpecBand";
import {
  PageHero,
  Section,
  Prose,
  CardGrid,
  Card,
  Callout,
  CtaBand,
  TeamGrid,
} from "@/components/Marketing";

export const metadata = {
  title: "About",
  description:
    "Ohio's specialty architectural products partner — one accountable team that specifies, supplies, installs, and services Division 08 and 10 systems.",
};

const VALUES = [
  {
    title: "Technical depth first",
    body: "Real spec data, ratings, and structural requirements — plus a catalog agent per line that cites its sources. We built the resource the industry was missing.",
  },
  {
    title: "One accountable team",
    body: "Specify, supply, field-measure, install, and service under one roof. No seam between supplier and installer for a problem to hide in.",
  },
  {
    title: "Factory-trained craft",
    body: "Certified on every line we install, measuring the built opening before anything is fabricated, and standing behind the result for the life of the building.",
  },
  {
    title: "Honest by structure",
    body: "We install four lines and supply a fifth — and we say so everywhere. The sell-vs-install distinction is wired into the site, not buried in a footnote.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Ohio's specialty architectural products partner."
        lead={`${activeBrand.name} exists to make Division 08 and 10 specialty scopes a solved problem instead of a coordination headache — for the architects who specify them, the GCs who build them, and the owners who live with them.`}
        crumbs={[{ href: "/", label: "Home" }]}
      />

      <Section eyebrow="The mark" title={activeBrand.name}>
        <div className="border border-hairline bg-surface p-4 md:p-8">
          {/* Full brand lockup (public/brand/logo.jpg). The compact IAS
              monogram lives in the header; this is the full banner. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/logo.jpg"
            alt={`${activeBrand.name} — Modernfold, Skyfold, Euro-Wall, Smoke Guard, Airolite`}
            className="mx-auto h-auto w-full max-w-3xl"
          />
        </div>
      </Section>

      <Section eyebrow="Why we exist" title="The technical resource the category was missing">
        <Prose>
          <p>
            Specialty architectural products — operable partitions, retractable
            walls, folding glass, smoke curtains, louvers — are among the hardest
            things on a project to specify and coordinate, and among the easiest
            to get wrong. Too often the supplier ships a crate and disappears,
            and the failure surfaces at install, or years later at a drop-test.
          </p>
          <p>
            We spun up to be the opposite: a partner with genuine spec depth,
            process transparency, and a factory-trained crew — one team
            accountable from the first spec conversation to the last service
            call. The website is part of that promise. Every number is sourced,
            every line has an agent that cites its documents, and the sell-vs-
            install reality is stated plainly, not spun.
          </p>
        </Prose>
      </Section>

      <Section eyebrow="What we stand for" title="Four commitments">
        <CardGrid cols={2}>
          {VALUES.map((v) => (
            <Card key={v.title} title={v.title}>
              {v.body}
            </Card>
          ))}
        </CardGrid>
      </Section>

      {team.length > 0 && (
        <Section eyebrow="Who you work with" title="The team">
          <TeamGrid members={team} />
        </Section>
      )}

      <Section eyebrow="What we carry" title="Five complementary lines">
        <div className="grid gap-px border border-hairline bg-hairline sm:grid-cols-2">
          {Object.values(productLines).map((line) => (
            <a
              key={line.slug}
              href={`/solutions/${line.category}/${line.slug}`}
              className="flex items-center justify-between gap-3 bg-canvas p-5 no-underline transition-colors hover:bg-surface"
            >
              <span className="font-serif text-lg text-ink">
                {line.name}
                {line.fulfillment === "sell-only" && (
                  <span className="ml-2 font-mono text-[10px] uppercase tracking-wide text-ink-muted">
                    Supply only
                  </span>
                )}
              </span>
              <CsiChip csi={line.csi} />
            </a>
          ))}
        </div>
      </Section>

      <Section eyebrow="Where we work" title="Based in Ohio">
        <Prose>
          <p>
            {activeBrand.name} is based in Ohio and serves {activeBrand.region}.
            See the <a href="/about/service-area">service area</a> for the
            metros we cover.
          </p>
        </Prose>
        <div className="mt-8">
          <Callout label="A note on our roots">
            We carry forward the architectural expertise of an established Ohio
            specialty-products team, rebuilt around a single idea: be the
            technical, accountable partner the specialty category deserves.
          </Callout>
        </div>
      </Section>

      <CtaBand
        title="Let's solve a specialty scope together."
        body="Whether you're specifying, bidding, building, or maintaining — start a conversation with the team that owns the whole chain."
        primary={{ href: "/contact/request-quote", label: "Request a quote" }}
        secondary={{ href: "/process", label: "See our process" }}
      />
    </>
  );
}
