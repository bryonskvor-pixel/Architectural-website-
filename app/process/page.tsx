import Link from "next/link";
import { PageScaffold } from "@/components/PageScaffold";

export const metadata = { title: "Process" };

const STEPS = [
  { href: "/process/design-assist", label: "Design Assist", who: "for architects — spec help, AIA CEU, CAD/BIM" },
  { href: "/process/preconstruction-install", label: "Preconstruction + Install", who: "for GCs — scheduling, structural coordination, field measure" },
  { href: "/process/service", label: "Service", who: "maintenance & repair, all brands (Phase 1.5)" },
];

export default function ProcessPage() {
  return (
    <PageScaffold
      eyebrow="Process"
      title="Bid → preconstruction → field measure → install → service"
      intent="One accountable team from design through service. This page walks the full process; sell-only Airolite scopes omit the install/field-measure steps."
      crumbs={[{ href: "/", label: "Home" }]}
    >
      <div className="grid gap-4">
        {STEPS.map((s) => (
          <Link key={s.href} href={s.href} className="block border border-hairline p-6 no-underline hover:border-accent">
            <h2 className="font-serif text-xl text-ink">{s.label}</h2>
            <p className="mt-1 text-sm text-ink-muted">{s.who}</p>
          </Link>
        ))}
      </div>
    </PageScaffold>
  );
}
