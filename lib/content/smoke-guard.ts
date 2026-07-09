import type { LineContent } from "@/lib/content/types";
import { activeBrand } from "@/lib/brand";

/**
 * SMOKE GUARD content — fire + smoke containment (IBC §3006 / 08-series). Every
 * number below is drawn from the authoritative Smoke Guard rows in the
 * pm-intelligence-agent D1 parameter store (brand = 'Smoke Guard'); `source`
 * strings match the D1 `source_doc` values so the page and the catalog agent
 * cite the same documents. Confirm against the manufacturer's current published
 * tech sheets, UL listings, and the project's code path / AHJ at build
 * (plan Caveats) before launch.
 *
 * Smoke Guard is life-safety equipment, not an acoustic product, so the models
 * table uses the free-form column layout (application / opening / power / fail-
 * safe) rather than the STC-pair layout used by the operable-partition lines.
 */

const M200_400 = "Smoke Guard M200/M400 Tech Sheet Rev8";
const M600 = "Smoke Guard M600 Tech Sheet Rev20";
const M1000 = "Smoke Guard M1000 Tech Sheet Rev5";
const M2100 = "Smoke Guard M2100 Tech Sheet Rev12";
const M2500 = "Smoke Guard M2500 Tech Sheet Rev8";
const M3000 = "Smoke Guard M3000 Tech Sheet Rev13";
const M4000 = "Smoke Guard M4000 Tech Sheet Rev11";
const HS2100 = "Smoke Guard Hose Stream 2100 Tech Sheet Rev1.1";
const DRAFT = "Smoke Guard SG Draft Tech Sheet Rev8";
const CTRL = "Smoke Guard Controller Tech Sheet Rev4";
const PB_FACP = "PM Master Playbook Sec 2 (FACP relay integration); Smoke Guard Controller Tech Sheet Rev4";
const PB_TIMING = "Smoke Guard Controller Tech Sheet Rev4 (deploy_delay_option); PM Master Playbook Sec 7 (AHJ alignment)";
const PB_POWER = "PM Master Playbook Sec 2-3 (Smoke Guard power continuity)";
const PB_CLEAR = "PM Master Playbook Sec 3 (wall face obstructions); Smoke Guard clearance guidance";

export const smokeGuardContent: LineContent = {
  overview:
    "Smoke Guard makes code-required smoke and fire containment nearly invisible — flexible curtains that store in a compact headbox and deploy only on alarm. The elevator models (M200/M400/M600) close the hoistway-opening path required by IBC §3006/§717; the M2100–M4000 series protects large architectural openings, atria, and mall concourses; and the HS2100 adds a 90-minute hose-stream fire rating. Every powered unit gravity-deploys to a fail-safe closed position on total power loss. Because it ties into the fire-alarm system and its deploy timing is fixed at the factory, the fire-alarm interface and the AHJ-approved timing must be settled before the order is placed — a timing change later means a hardware reorder, not a field adjustment. The final determination of code compliance always rests with the AHJ and the design team.",

  applications: [
    "Elevator hoistway and lobby smoke protection to satisfy IBC §3006 without a physical elevator lobby or added doors (M600 / M400).",
    "Large openings between fire or smoke zones — mall concourses, atria, and open stairs — where a permanent wall isn't wanted (M2100–M4000).",
    "Horizontal smoke containment below a floor deck or across an atrium ceiling (M3000, horizontal deployment).",
    "Openings needing a rated fire barrier with hose-stream performance, not smoke containment alone (HS2100, 90 minutes).",
    "Fixed draft curtains for smoke-reservoir and zoning strategies (SG Draft, static, unlimited width).",
  ],

  models: {
    caption:
      "Smoke Guard models are selected by application and opening size, not by a single rating. Elevator models (M200/M400/M600) protect hoistway openings; M2100–M4000 protect large architectural openings and atria; HS2100 adds a 90-minute hose-stream fire rating. Final model, deploy timing, and listing must be confirmed against the project's code path and AHJ.",
    columns: ["Model", "Application", "Max opening", "Power", "Backup / fail-safe"],
    rows: [
      { cells: ["M200", "Elevator smoke — needs aux ferrous rails", "10 ft drop", "120/240 VAC, 2 A", "No battery (see M400)"] },
      { cells: ["M400", "Elevator smoke — uses ferrous door frame", "12 ft drop, ≤ 60 in housing", "120/240 VAC, 2 A", "Optional battery ≥ 8 hr"] },
      { cells: ["M600", "Elevator lobby — deploys on lobby detector only", "55–110 in housing", "120/240 VAC, 2 A", "Battery standard; fail-safe on power loss"] },
      { cells: ["M1000", "Passive fusible-link opening protection", "6 × 8 ft", "None (passive)", "Fusible link @ 165 °F"] },
      { cells: ["M2100", "Opening smoke curtain, UL 864 controls", "16 × 12 ft", "120 VAC, 7 A", "24 VDC battery; gravity fail-safe"] },
      { cells: ["M2500", "Wide-opening smoke curtain", "Up to 60 ft wide", "120/240 VAC, 10 A/motor", "24 VDC battery; gravity fail-safe"] },
      { cells: ["M3000", "Horizontal-deploy smoke curtain (below deck)", "24 × 30 ft", "120/240 VAC, 10 A/unit", "24 VDC battery; gravity fail-safe"] },
      { cells: ["M4000", "Large perimeter / atrium smoke curtain", "15 ft drop × 220 ft linear", "120/240 VAC, 20 A/60 ft", "24 VDC battery; gravity fail-safe"] },
      { cells: ["HS2100", "Hose-stream fire + smoke (90 min)", "12 × 12 ft", "120/240 VAC, 20/10 A", "24 VDC battery; gravity fail-safe"] },
      { cells: ["SG Draft", "Static fixed draft curtain", "15 ft drop, unlimited width", "None (static)", "N/A"] },
    ],
  },

  technical: [
    {
      title: "Listings & fire rating",
      facts: [
        { label: "Controller listing", value: "UL 864 (listed by Intertek)", source: CTRL },
        { label: "HS2100 fire rating", value: "90 min with hose stream — NFPA 252 / UL 10B / CAN-ULC-S104", source: HS2100 },
        { label: "M1000 release", value: "UL-listed fusible link, releases at 165 °F", source: M1000 },
        { label: "SG Draft material", value: "SGTex10 glass-filament smoke fabric", source: DRAFT },
      ],
    },
    {
      title: "Deployment & fail-safe",
      facts: [
        { label: "Powered-model fail-safe", value: "Gravity deploy to closed on total power loss (incl. battery)", source: M2100 },
        { label: "M600 activation (critical)", value: "Deploys on the elevator-lobby detector only — NOT on general building alarm", source: M600 },
        { label: "Deploy-delay option (AHJ-critical)", value: "Field-set to a 7 ft level, 30 s pause, then full deploy — delay time is set AT TIME OF ORDER and cannot be changed later without a reorder", source: CTRL },
        { label: "M3000 / M4000 HVAC coordination", value: "All HVAC / smoke-evacuation systems must be off while the curtain is moving", source: M3000 },
        { label: "M4000 obstruction sensor", value: "Optional bottom-pan sensor detects impediments to deployment", source: M4000 },
      ],
    },
    {
      title: "Controllers & power",
      facts: [
        { label: "FACP integration", value: "Deploys on a normally-open, supervised dry contact from the smoke/fire panel", source: M2100 },
        { label: "Controller power", value: "120 VAC, 7 A max", source: CTRL },
        { label: "Controller battery", value: "12 VDC SLA; hold-open 2–24 hr by system size; replace every 2–3 yr", source: CTRL },
        { label: "Controller distance limit", value: "30 conduit ft (15 ft for M2500 over 40 ft wide)", source: CTRL },
        { label: "Large systems (> 20 ft)", value: "One Main + one Satellite controller", source: M2500 },
        { label: "FSCS option", value: "Firefighter Smoke Control Station interface — priority OPEN/CLOSE + status relays", source: CTRL },
      ],
    },
    {
      title: "Housings & sizes",
      facts: [
        { label: "Elevator housing (M600)", value: "9 H × 10.5 D in (plus return)", source: M600 },
        { label: "Opening-curtain housing (M2100)", value: "6.25 H × 6 D in", source: M2100 },
        { label: "M3000 headbox / footbox", value: "10.875 H × 14.25 D in / 11 H × 12 D in", source: M3000 },
        { label: "Return-depth options (M400)", value: "0.5 / 0.75 / 1 / 1.5 in", source: M200_400 },
      ],
    },
  ],

  gcReadiness: {
    intro:
      "Smoke Guard is life-safety equipment tied into the fire-alarm system and building power — the electrical, fire-alarm, and clearance scope must be right before commissioning, and the deploy timing must be locked before the order is placed. These are the items that most often fail an acceptance test or hold a Certificate of Occupancy.",
    items: [
      { label: "FACP contact shown feeding the controller", detail: "A normally-open, supervised auxiliary contact from the fire-alarm panel drawn feeding each Smoke Guard controller — without it the curtain never receives the alarm signal and will not deploy.", source: PB_FACP },
      { label: "Deploy timing confirmed vs AHJ before ordering", detail: "Egress deploy-delay / timing sequence agreed with the AHJ before the order is placed — controller timing is set at the factory and a change requires a hardware reorder, not a field adjustment.", source: PB_TIMING },
      { label: "Dedicated 120 V circuit per controller", detail: "A dedicated 120 VAC circuit to each curtain controller so the battery-backed system can hold its emergency configuration.", source: PB_POWER },
      { label: "Travel path & wall face clear", detail: "Curtain travel path and the adjacent wall face shown clear of sprinkler heads, exit signs, HVAC diffusers, call buttons, and frames — an obstruction fails the acceptance test after finishes are complete.", source: PB_CLEAR },
    ],
  },

  finishes:
    "Smoke Guard is code-driven life-safety equipment, so selection is governed by rating and listing rather than appearance. The curtains use a translucent glass-fiber smoke fabric (SGTex10 on the SG Draft) that stores fully concealed in a compact headbox and is invisible until it deploys; the housing and side guides are the only visible elements and are finished to suit the opening. Because a housing must sit above every protected opening, coordinate its size early with the ceiling and elevator-entrance details.",

  resources: [
    { label: "Smoke Guard model tech sheets & UL listings", kind: "link", note: "Authoritative, manufacturer-updated — linked, not mirrored.", href: "https://www.smokeguard.com" },
    { label: "Smoke Guard 3-part specs (08-series / IBC §3006)", kind: "link", note: "Download the current guide specs from the manufacturer / ARCAT.", href: "https://www.arcat.com" },
    { label: `${activeBrand.name} Smoke Guard fire-alarm interface & deploy-timing checklist`, kind: "host", note: "Dealer value-add — the GC coordination list above as a one-page PDF." },
    { label: `${activeBrand.name} regional Smoke Guard / elevator-code installations`, kind: "host", note: "Ohio project photography and references." },
  ],
};
