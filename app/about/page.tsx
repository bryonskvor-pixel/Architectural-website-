import Link from "next/link";
import { activeBrand } from "@/lib/brand";
import { PageScaffold } from "@/components/PageScaffold";

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <PageScaffold
      eyebrow="About"
      title={`Ohio's specialty architectural products partner`}
      intent="The spin-off's reason to exist: become the technical resource the parent (Air Control Products' architectural division) never was — full spec depth, process transparency, and factory-trained install across five lines."
      crumbs={[{ href: "/", label: "Home" }]}
    >
      <p className="max-w-2xl text-ink-muted">
        {activeBrand.name} serves {activeBrand.region}. Confirm the intended
        (possibly expanded) service region before finalizing service-area copy —
        the parent&apos;s stated territory is Northern and Central Ohio.
      </p>
      <p className="mt-6">
        <Link href="/about/service-area" className="text-accent hover:underline">
          Service area →
        </Link>
      </p>
    </PageScaffold>
  );
}
