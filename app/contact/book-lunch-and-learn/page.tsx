import { PageScaffold } from "@/components/PageScaffold";

export const metadata = { title: "Book a Lunch-and-Learn" };

export default function BookLunchAndLearnPage() {
  return (
    <PageScaffold
      eyebrow="Contact"
      title="Book a Lunch-and-Learn"
      intent="Booking flow for AIA CEU lunch-and-learns at architecture firms. Ties into /resources/aia-ceu. Full flow is Phase 1.5."
      phase="Phase 1.5"
      crumbs={[
        { href: "/", label: "Home" },
        { href: "/contact", label: "Contact" },
      ]}
    />
  );
}
