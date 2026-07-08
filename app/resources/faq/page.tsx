import { PageScaffold } from "@/components/PageScaffold";

export const metadata = { title: "FAQ" };

export default function FaqPage() {
  return (
    <PageScaffold
      eyebrow="Resources"
      title="FAQ"
      intent="Specifier and GC FAQs, seeded from recurring agent questions (the agent-as-content loop — logged questions become FAQ/spec content, compounding SEO). FAQ schema markup for discoverability."
      crumbs={[
        { href: "/", label: "Home" },
        { href: "/resources", label: "Resources" },
      ]}
    />
  );
}
