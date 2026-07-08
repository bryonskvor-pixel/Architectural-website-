import { PageScaffold } from "@/components/PageScaffold";

export const metadata = { title: "AIA CEU" };

export default function AiaCeuPage() {
  return (
    <PageScaffold
      eyebrow="Resources"
      title="AIA CEU / Lunch-and-Learn"
      intent="Continuing education is architects' #1 product-research resource. Cross-links manufacturer AIA courses (e.g. Euro-Wall's five LU/HSW courses) and books in-person lunch-and-learns. Booking flow is Phase 1.5."
      phase="Phase 1.5"
      crumbs={[
        { href: "/", label: "Home" },
        { href: "/resources", label: "Resources" },
      ]}
    />
  );
}
