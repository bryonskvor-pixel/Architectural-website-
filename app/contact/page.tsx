import {
  activeBrand,
  addressLines,
  isPlaceholderPhone,
  isPlaceholderEmail,
} from "@/lib/brand";
import { PageHero, Section, CardGrid, Card, Callout } from "@/components/Marketing";

export const metadata = {
  title: "Contact",
  description:
    "Talk to a specialist — request a quote or RFI, or book an AIA lunch-and-learn. Every catalog-agent escalation routes here with your question pre-filled.",
};

const phoneHref = `tel:${activeBrand.contact.phone.replace(/[^0-9+]/g, "")}`;
const emailHref = `mailto:${activeBrand.contact.email}`;

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to a specialist."
        lead="Whether you're specifying, bidding, building, or maintaining, you reach the same accountable team. Pick the path that fits — we'll follow up directly."
        crumbs={[{ href: "/", label: "Home" }]}
      />

      <Section eyebrow="How can we help?" title="Choose a path">
        <CardGrid cols={2}>
          <Card
            title="Request a Quote / RFI"
            kicker="Estimators, GCs & architects"
            href="/contact/request-quote"
          >
            A structured takeoff or technical question — ratings, CSI scope,
            sizes, drawings, or lead times. For supply-only Airolite we prepare a
            takeoff rather than schedule a field measure.
          </Card>
          <Card
            title="Book a Lunch-and-Learn"
            kicker="Architecture firms"
            href="/contact/book-lunch-and-learn"
          >
            An AIA-accredited continuing-education session delivered at your
            office — you pick the topic and the date.
          </Card>
        </CardGrid>
      </Section>

      <Section eyebrow="Reach us directly" title="Visit, call, or email">
        <dl className="grid gap-px border border-hairline bg-hairline sm:grid-cols-2">
          {addressLines().length > 0 && (
            <div className="bg-canvas p-6">
              <dt className="font-mono text-[11px] uppercase tracking-wide text-ink-muted">
                Office
              </dt>
              <dd className="mt-2 font-mono text-lg leading-snug text-ink">
                {addressLines().map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </dd>
            </div>
          )}
          {!isPlaceholderPhone() && (
            <div className="bg-canvas p-6">
              <dt className="font-mono text-[11px] uppercase tracking-wide text-ink-muted">
                Phone
              </dt>
              <dd className="mt-2 font-mono text-lg text-ink">
                <a href={phoneHref} className="hover:text-accent">
                  {activeBrand.contact.phone}
                </a>
              </dd>
            </div>
          )}
          {!isPlaceholderEmail() && (
            <div className="bg-canvas p-6">
              <dt className="font-mono text-[11px] uppercase tracking-wide text-ink-muted">
                Email
              </dt>
              <dd className="mt-2 font-mono text-lg text-ink">
                <a href={emailHref} className="hover:text-accent">
                  {activeBrand.contact.email}
                </a>
              </dd>
            </div>
          )}
        </dl>
        <p className="mt-4 font-mono text-xs text-ink-muted">
          {activeBrand.name} · {activeBrand.region}
        </p>
        <div className="mt-8">
          <Callout label="Prefer to ask a spec question first?">
            Every product line has an on-page catalog agent that answers ratings,
            sizes, and coordination questions with citations — and hands you off
            to a human here, with your conversation pre-filled, whenever you want
            one. Start on any <a href="/solutions">product line</a>.
          </Callout>
        </div>
      </Section>
    </>
  );
}
