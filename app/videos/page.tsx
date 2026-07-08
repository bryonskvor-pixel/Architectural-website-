import { PageScaffold } from "@/components/PageScaffold";

export const metadata = { title: "Videos" };

// PHASE 3 — stub route only. Do not build the video library in Phase 1 (plan Part 6.3).
export default function VideosPage() {
  return (
    <PageScaffold
      eyebrow="Videos"
      title="Installation & Operation Videos"
      intent="A hosted/embedded video library per line; agents will be able to cite and link relevant videos. Deferred to Phase 3."
      phase="Phase 3 (stub only)"
      crumbs={[{ href: "/", label: "Home" }]}
    />
  );
}
