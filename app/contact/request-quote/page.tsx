import { Suspense } from "react";
import Link from "next/link";
import { RfqForm } from "@/components/RfqForm";

export const metadata = { title: "Request a Quote / RFI" };

/**
 * Request a Quote / RFI page (plan Part 6.2). Renders the real RFQ form, which
 * also serves as the catalog agents' human-escalation target (pre-filled via
 * `?line=&topic=&session=&source=`). The form reads query params, so it lives
 * inside a Suspense boundary per Next 15's useSearchParams requirement.
 */
export default function RequestQuotePage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-wrap gap-2 font-mono text-[11px] text-ink-muted">
          <li>
            <Link href="/" className="hover:text-ink">Home</Link>
            <span className="ml-2 text-hairline">/</span>
          </li>
          <li>
            <Link href="/contact" className="hover:text-ink">Contact</Link>
            <span className="ml-2 text-hairline">/</span>
          </li>
        </ol>
      </nav>

      <p className="font-mono text-xs uppercase tracking-wide text-ink-muted">Contact</p>
      <h1 className="mt-3 font-serif text-4xl leading-tight text-ink md:text-5xl">
        Request a Quote / RFI
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted">
        Tell us the product line, opening conditions, and what you need — ratings,
        CSI scope, sizes, drawings, or lead times. A specialist follows up directly.
        For supply-only Airolite, we&apos;ll prepare a takeoff rather than schedule a
        field measure.
      </p>

      <div className="mt-12">
        <Suspense fallback={<p className="font-mono text-sm text-ink-muted">Loading form…</p>}>
          <RfqForm />
        </Suspense>
      </div>
    </div>
  );
}
