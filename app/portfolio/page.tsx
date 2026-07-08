import { PageScaffold } from "@/components/PageScaffold";

export const metadata = { title: "Portfolio" };

// PHASE 2 — stub route only. Do not build the gallery in Phase 1 (plan Part 6.3).
export default function PortfolioPage() {
  return (
    <PageScaffold
      eyebrow="Portfolio"
      title="Portfolio"
      intent="A filterable project gallery (by product line, building type, region) with editorial case studies naming architect/GC. Deferred until real project assets are collected — do not block launch on it."
      phase="Phase 2 (stub only)"
      crumbs={[{ href: "/", label: "Home" }]}
    />
  );
}
