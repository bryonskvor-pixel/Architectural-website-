import type { LineContent } from "@/lib/content/types";
import { activeBrand } from "@/lib/brand";

/**
 * SKYFOLD content — the reference implementation. Every number below is drawn
 * from the authoritative Skyfold rows in the pm-intelligence-agent D1 parameter
 * store (brand = 'Skyfold'); `source` strings match the D1 `source_doc` values.
 * Confirm against the manufacturer's current published spec at build
 * (plan Caveats) before launch.
 *
 * Note the acoustic nuance surfaced deliberately: SYSTEM STC (installed, what a
 * specifier designs to) is lower than PANEL STC (lab, panel alone). Both are
 * shown so the page reads as a technical instrument, not marketing.
 */

const CLASSIC_SPEC = "Skyfold Classic Spec Sheet §10 22 39 (rev. 2016-10)";
const COMPARISON = "Skyfold Product Line Comparison Summary";
const DEFLECTION = "Skyfold Standard Deflection Criteria";
const GC_NOTES = "Skyfold Zenith Premium GC Notes";
const FINISHES = "Skyfold Finishes page (skyfold.com)";

export const skyfoldContent: LineContent = {
  overview:
    "Skyfold walls retract vertically into a ceiling pocket — no floor tracks, no visible guides, fully automated at the turn of a key. The category leader for acoustic separation in operable partitions, with installed system STC up to 60 (Rw 59). Because the panels stack into the ceiling, the structure above must be coordinated early: Skyfold-approved support steel, deflection tolerances, and 208 V 3-phase power are GC scope, supplied by others.",

  applications: [
    "Ballrooms, conference centers, and hotel function space needing the highest acoustic separation with zero floor track.",
    "Multipurpose and worship spaces where a clear, unobstructed floor is required when the wall is stored.",
    "Gymnasiums and divisible classrooms with high ceilings (Classic reaches 36 ft finished-ceiling height).",
    "Glass daylighting divisions where a retracting transparent wall is wanted (Mirage series).",
  ],

  models: {
    caption:
      "System STC is the installed rating a specifier designs to; panel STC is the lab rating of the panel alone. Weights drive the support-steel design.",
    rows: [
      { series: "Classic", model: "51", systemStc: "51 (Rw 51)", panelStc: "61 (Rw 60)", weight: "7.0 lbs/ft²", maxHeight: "36 ft" },
      { series: "Classic", model: "55", systemStc: "55 (Rw 54)", panelStc: "61 (Rw 60)", weight: "7.6 lbs/ft²", maxHeight: "36 ft" },
      { series: "Classic", model: "60", systemStc: "60 (Rw 59)", panelStc: "66 (Rw 64)", weight: "9.4 lbs/ft²", maxHeight: "28.2 ft" },
      { series: "Classic", model: "NRC", systemStc: "50 (Rw 49)", panelStc: "60 (Rw 58)", weight: "7.5 lbs/ft²", maxHeight: "36 ft", note: "NRC 0.65 — fabric face only" },
      { series: "Zenith", model: "48", systemStc: "48 (Rw 47)", panelStc: "57 (Rw 55)", weight: "6.0 lbs/ft²", maxHeight: "12 ft" },
      { series: "Zenith", model: "60", systemStc: "60 (Rw 59)", panelStc: "66 (Rw 64)", weight: "8.6 lbs/ft²", maxHeight: "12 ft" },
      { series: "Zenith Premium", model: "51", systemStc: "51 (Rw 51)", panelStc: "61 (Rw 60)", weight: "6.2 lbs/ft²", maxHeight: "14 ft", note: "Touchscreen standard; pocket closure available" },
      { series: "Zenith Premium", model: "60", systemStc: "60 (Rw 59)", panelStc: "66 (Rw 64)", weight: "8.6 lbs/ft²", maxHeight: "14 ft" },
      { series: "Mirage", model: "Glass", systemStc: "33 (Rw 33)", panelStc: "36 (Rw 36)", weight: "7.5 lbs/ft²", maxHeight: "24 ft", note: "Single laminated glass; has wall tracks + IR sensor" },
    ],
  },

  technical: [
    {
      title: "Structure & deflection",
      facts: [
        { label: "Support steel — parallel tolerance", value: '1/2 in. over entire wall length (includes loaded deflection)', source: CLASSIC_SPEC },
        { label: "Support steel — centerline tolerance", value: "1/8 in. left-to-right", source: CLASSIC_SPEC },
        { label: "Deflection — dead load", value: "1 in. (standard criteria)", source: DEFLECTION },
        { label: "Deflection — live load", value: "1/2 in. (standard criteria)", source: DEFLECTION },
        { label: "Floor flatness", value: "1/4 in. along wall axis", source: CLASSIC_SPEC },
        { label: "Fixed wall plumb", value: "+1/4 in. / -0", source: CLASSIC_SPEC },
      ],
    },
    {
      title: "Electrical & controls",
      facts: [
        { label: "Power supply", value: "208 VAC ±10%, 3-phase, 60 Hz", source: GC_NOTES },
        { label: "Control box enclosure", value: "NEMA 1 standard (NEMA 4 on request)", source: CLASSIC_SPEC },
        { label: "Control box weight", value: "41 lbs", source: GC_NOTES },
        { label: "Switch/device exclusion zone", value: "14 in. from wall centerline — no switches, alarms, thermostats, or door frames", source: GC_NOTES },
        { label: "Access panels", value: "24 x 24 in., 2 locations at motor", source: GC_NOTES },
      ],
    },
    {
      title: "Operation & safety",
      facts: [
        { label: "Operating speed", value: "5–10 vertical ft/min", source: CLASSIC_SPEC },
        { label: "Obstruction behavior", value: "Reverses and ascends ~3 s to clear on contact, then resumes", source: CLASSIC_SPEC },
        { label: "Design life", value: "10,000 complete open–close cycles", source: CLASSIC_SPEC },
        { label: "Drive type", value: "Rigid drive — chain or belt drive not acceptable", source: CLASSIC_SPEC },
      ],
    },
    {
      title: "Seals & warranty",
      facts: [
        { label: "Ceiling / floor seal gap", value: "2 in. max", source: CLASSIC_SPEC },
        { label: "End seal gap", value: "1 in. max", source: CLASSIC_SPEC },
        { label: "Warranty — basic", value: "2 years or 5,000 cycles, whichever first", source: CLASSIC_SPEC },
        { label: "Warranty — extended parts (optional)", value: "10 years or 5,000 cycles, whichever first", source: CLASSIC_SPEC },
      ],
    },
  ],

  gcReadiness: {
    intro:
      "Skyfold stacks into the ceiling, so the general contractor owns the structure and power above the opening. Get these right before install day — they are the usual sources of delay.",
    items: [
      { label: "Support steel (by others)", detail: "Skyfold-approved steel, parallel within 1/2 in. over the full wall length including loaded deflection; centerline within 1/8 in. left-to-right.", source: CLASSIC_SPEC },
      { label: "Floor flatness", detail: "Finished floor flat within 1/4 in. along the wall axis.", source: CLASSIC_SPEC },
      { label: "Power", detail: "208 VAC ±10%, 3-phase, 60 Hz available at the control-box location.", source: GC_NOTES },
      { label: "Keep the centerline clear", detail: "No switches, alarms, thermostats, or door frames within 14 in. of the wall centerline on either side.", source: GC_NOTES },
      { label: "Deep pockets built last", detail: "Ceiling pockets deeper than 3 ft must be constructed after the wall is installed.", source: GC_NOTES },
      { label: "Motor access", detail: "Provide two 24 x 24 in. access panels at the motor.", source: GC_NOTES },
    ],
  },

  finishes:
    "Standard finishes are railroaded (applied horizontally) to a max thickness of 1/8 in. (3 mm). Customer-supplied vinyl/fabric wrapped around panel edges is limited to 0.04 in. (1 mm); anything thicker must be rigid (plastic laminate or wood veneer) and applied to the panel face only, not wrapped. NRC acoustic models accept acoustically transparent fabric only — the rating depends on airflow through the fabric face.",

  resources: [
    { label: "Skyfold CAD / BIM library", kind: "link", note: "Authoritative, manufacturer-updated — linked, not mirrored.", href: "https://www.skyfold.com" },
    { label: "Classic 3-part spec (CSI 10 22 39)", kind: "link", note: "Download the current guide spec from ARCAT.", href: "https://www.arcat.com" },
    { label: "Notes to G.C. drawings", kind: "link", note: "Manufacturer coordination drawings for support steel and pocket.", href: "https://www.skyfold.com" },
    { label: `${activeBrand.name} Skyfold structural & electrical readiness checklist`, kind: "host", note: "Dealer value-add — the GC punch list above as a one-page PDF." },
    { label: `${activeBrand.name} regional Skyfold installations`, kind: "host", note: "Ohio project photography and references." },
  ],
};
