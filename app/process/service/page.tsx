import { activeBrand } from "@/lib/brand";
import {
  PageHero,
  Section,
  Prose,
  CardGrid,
  Card,
  Callout,
  CtaBand,
} from "@/components/Marketing";

export const metadata = {
  title: "Service",
  description:
    "An in-house service division that maintains and repairs operable partitions, glass walls, and smoke/fire systems — regardless of who originally supplied them.",
};

const SERVICES = [
  {
    title: "Preventive maintenance",
    body: "Scheduled adjustment, lubrication, and seal inspection that keeps operable partitions and glass walls closing to their rated acoustic and weather performance.",
  },
  {
    title: "Repair & parts",
    body: "Diagnosis and repair of tracks, carriers, seals, hardware, and controls — with access to manufacturer parts for the lines we carry.",
  },
  {
    title: "Life-safety testing",
    body: "Drop-tests, deployment checks, and inspection documentation for Smoke Guard and rated systems, on the cadence your AHJ and building require.",
  },
  {
    title: "Assessments",
    body: "Condition surveys of existing partitions and openings — what is worth maintaining, what needs replacement, and what it will take.",
  },
];

export default function ServicePage() {
  return (
    <>
      <PageHero
        eyebrow="Process · Service division"
        title="Installed right — and serviced for the life of the building."
        lead={`${activeBrand.name} runs an in-house service division that maintains and repairs the specialty systems we install, and systems other people installed. An operable partition or smoke curtain is a mechanical, code-bearing assembly; it needs the same care years three, ten, and twenty as it did on opening day.`}
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/process", label: "Process" },
        ]}
      />

      <Section eyebrow="What we service" title="Every brand we carry — and beyond">
        <Prose>
          <p>
            We service what we sell, and we service what we didn&apos;t. If you
            have an operable partition, a folding glass wall, or an elevator
            smoke curtain in your building, our factory-trained technicians can
            maintain and repair it regardless of who originally supplied it.
          </p>
        </Prose>
        <div className="mt-8">
          <CardGrid cols={2}>
            {SERVICES.map((s) => (
              <Card key={s.title} title={s.title}>
                {s.body}
              </Card>
            ))}
          </CardGrid>
        </div>
      </Section>

      <Section eyebrow="Why in-house matters" title="The same team, accountable for the outcome">
        <Prose>
          <p>
            Handing a specialty system to a general handyman is how acoustic
            ratings quietly disappear and code-required curtains fail their next
            drop-test. Our technicians are trained on the specific mechanisms —
            counterbalances, carriers, seal geometry, and control integrations —
            so a service call restores the system to its rated performance, with
            documentation to prove it.
          </p>
        </Prose>
        <div className="mt-8">
          <Callout label="Expanding — Phase 1.5">
            The full service-division build-out — online scheduling, service
            agreements, and a maintenance portal — is rolling out in Phase 1.5.
            Service is available now: reach us directly to set up maintenance,
            book a repair, or schedule life-safety testing.
          </Callout>
        </div>
      </Section>

      <CtaBand
        title="Need a system serviced, tested, or assessed?"
        body="Tell us the building, the system, and the issue. We will schedule a technician who knows the mechanism."
        primary={{ href: "/contact/request-quote", label: "Request service" }}
        secondary={{ href: "/contact", label: "Contact us" }}
      />
    </>
  );
}
