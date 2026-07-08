import { PageScaffold } from "@/components/PageScaffold";

export const metadata = { title: "Service Area" };

export default function ServiceAreaPage() {
  return (
    <PageScaffold
      eyebrow="About"
      title="Service Area"
      intent="Genuine markets served — Cleveland, Columbus, Akron, Toledo and surrounding Ohio metros. Each market page must be specific (real projects, local code notes, coverage) to avoid thin/duplicate doorway pages Google penalizes."
      crumbs={[
        { href: "/", label: "Home" },
        { href: "/about", label: "About" },
      ]}
    />
  );
}
