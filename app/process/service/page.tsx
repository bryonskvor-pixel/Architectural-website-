import { PageScaffold } from "@/components/PageScaffold";

export const metadata = { title: "Service" };

export default function ServicePage() {
  return (
    <PageScaffold
      eyebrow="Process"
      title="Service"
      intent="In-house service division that maintains and repairs all brands regardless of who supplied them — mirroring the Powers model. Full build-out is Phase 1.5."
      phase="Phase 1.5"
      crumbs={[
        { href: "/", label: "Home" },
        { href: "/process", label: "Process" },
      ]}
    />
  );
}
