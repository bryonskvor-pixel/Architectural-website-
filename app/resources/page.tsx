import Link from "next/link";
import { PageScaffold } from "@/components/PageScaffold";

export const metadata = { title: "Resources" };

const RESOURCES = [
  { href: "/resources/spec-library", label: "Spec Library", note: "by CSI section — 08 43 33, 10 22 26, 10 22 39, 10 22 43, 08 90 00" },
  { href: "/resources/cad-bim", label: "CAD / BIM", note: "links + hosted files per line" },
  { href: "/resources/lead-times", label: "Lead Times", note: "transparency table" },
  { href: "/resources/aia-ceu", label: "AIA CEU", note: "lunch-and-learn / CEU booking" },
  { href: "/resources/faq", label: "FAQ", note: "and agent-mined long-tail questions" },
];

export default function ResourcesPage() {
  return (
    <PageScaffold
      eyebrow="Resources"
      title="Everything you need to specify"
      intent="A resources-forward hub for specifiers. Manufacturer CAD/BIM/CSI specs are linked (not mirrored) so they never go stale; only dealer value-add is hosted here."
      crumbs={[{ href: "/", label: "Home" }]}
    >
      <div className="grid gap-4">
        {RESOURCES.map((r) => (
          <Link key={r.href} href={r.href} className="flex items-baseline justify-between gap-4 border border-hairline p-5 no-underline hover:border-accent">
            <span className="font-serif text-xl text-ink">{r.label}</span>
            <span className="font-mono text-[11px] text-ink-muted">{r.note}</span>
          </Link>
        ))}
      </div>
    </PageScaffold>
  );
}
