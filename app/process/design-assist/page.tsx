import { PageScaffold } from "@/components/PageScaffold";

export const metadata = { title: "Design Assist" };

export default function DesignAssistPage() {
  return (
    <PageScaffold
      eyebrow="Process · For architects"
      title="Design Assist"
      intent="Spec help at the DD stage, AIA CEU / lunch-and-learn, and CAD/BIM support — meeting architects where decisions actually crystallize. Leads with the agents and the resource library."
      crumbs={[
        { href: "/", label: "Home" },
        { href: "/process", label: "Process" },
      ]}
    />
  );
}
