import { productLines } from "@/lib/products";
import { PageScaffold } from "@/components/PageScaffold";
import { CsiChip } from "@/components/SpecBand";

export const metadata = { title: "Spec Library" };

export default function SpecLibraryPage() {
  return (
    <PageScaffold
      eyebrow="Resources"
      title="Spec Library — by CSI section"
      intent="Architects search by CSI number; we own those landing pages. Each section links the manufacturer's current 3-part spec and lists the lines that fall under it. CSI numbers must be confirmed against current published specs at build (plan Caveats)."
      crumbs={[
        { href: "/", label: "Home" },
        { href: "/resources", label: "Resources" },
      ]}
    >
      <ul className="divide-y divide-hairline border border-hairline">
        {Object.values(productLines).map((l) => (
          <li key={l.slug} className="flex items-center justify-between gap-4 px-5 py-4">
            <span className="text-ink">{l.name}</span>
            <CsiChip csi={l.csi} />
          </li>
        ))}
      </ul>
    </PageScaffold>
  );
}
