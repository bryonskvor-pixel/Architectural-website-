import { PageScaffold } from "@/components/PageScaffold";

export const metadata = { title: "Preconstruction + Install" };

export default function PreconstructionInstallPage() {
  return (
    <PageScaffold
      eyebrow="Process · For GCs"
      title="Preconstruction + Install"
      intent="Accurate budgets, clean scope, structural coordination (support steel, backing, power), on-time field measure and factory-trained install. Leads with process transparency and lead times."
      crumbs={[
        { href: "/", label: "Home" },
        { href: "/process", label: "Process" },
      ]}
    />
  );
}
