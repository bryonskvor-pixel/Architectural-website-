import { PageScaffold } from "@/components/PageScaffold";

export const metadata = { title: "CAD / BIM" };

export default function CadBimPage() {
  return (
    <PageScaffold
      eyebrow="Resources"
      title="CAD / BIM"
      intent="Per-line links to manufacturer DWG/Revit/BIMsmith libraries (linked, not mirrored — they update, we don't want stale files). Some architects skip suppliers who don't provide BIM objects, so this page is table stakes."
      crumbs={[
        { href: "/", label: "Home" },
        { href: "/resources", label: "Resources" },
      ]}
    />
  );
}
