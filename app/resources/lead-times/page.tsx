import { PageScaffold } from "@/components/PageScaffold";

export const metadata = { title: "Lead Times" };

export default function LeadTimesPage() {
  return (
    <PageScaffold
      eyebrow="Resources"
      title="Lead Times"
      intent="A transparency table of typical lead times per line (including Airolite's Qwik Ship 1/3/5/10/20-day program). Lead-time honesty is a dealer value-add and a GC trust signal. Full table is Phase 1.5."
      phase="Phase 1.5"
      crumbs={[
        { href: "/", label: "Home" },
        { href: "/resources", label: "Resources" },
      ]}
    />
  );
}
