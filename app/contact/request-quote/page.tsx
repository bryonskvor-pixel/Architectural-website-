import { PageScaffold } from "@/components/PageScaffold";

export const metadata = { title: "Request a Quote" };

export default function RequestQuotePage() {
  return (
    <PageScaffold
      eyebrow="Contact"
      title="Request a Quote / RFI"
      intent="Structured RFQ/RFI form (product line, project, CSI scope, drawings upload, question). Submits via /api/rfq. Sell-only Airolite requests are framed as 'takeoff' not 'field measure'. Form + endpoint wired in a later session."
      crumbs={[
        { href: "/", label: "Home" },
        { href: "/contact", label: "Contact" },
      ]}
    />
  );
}
