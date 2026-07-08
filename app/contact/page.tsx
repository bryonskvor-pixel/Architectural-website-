import Link from "next/link";
import { activeBrand } from "@/lib/brand";
import { PageScaffold } from "@/components/PageScaffold";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <PageScaffold
      eyebrow="Contact"
      title="Talk to a specialist"
      intent="Structured RFQ/RFI flow and lunch-and-learn booking. The agents' human-escalation button routes here with the conversation topic and product line pre-filled."
      crumbs={[{ href: "/", label: "Home" }]}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <Link href="/contact/request-quote" className="border border-hairline p-6 no-underline hover:border-accent">
          <h2 className="font-serif text-xl text-ink">Request a Quote / RFI</h2>
          <p className="mt-1 text-sm text-ink-muted">Structured takeoff and technical questions.</p>
        </Link>
        <Link href="/contact/book-lunch-and-learn" className="border border-hairline p-6 no-underline hover:border-accent">
          <h2 className="font-serif text-xl text-ink">Book a Lunch-and-Learn</h2>
          <p className="mt-1 text-sm text-ink-muted">AIA CEU credit for your firm.</p>
        </Link>
      </div>
      <p className="mt-8 font-mono text-xs text-ink-muted">
        {activeBrand.contact.phone} · {activeBrand.contact.email}
      </p>
    </PageScaffold>
  );
}
