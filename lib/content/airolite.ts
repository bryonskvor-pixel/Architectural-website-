import type { LineContent } from "@/lib/content/types";

/**
 * AIROLITE content — architectural louvers, grilles, sun controls & screens
 * (CSI 08 90 00). Every number below is drawn from the authoritative Airolite
 * rows in the pm-intelligence-agent D1 parameter store (brand = 'Airolite');
 * `source` strings match the D1 `source_doc` values so the page and the catalog
 * agent cite the same documents. Confirm against the manufacturer's current
 * published spec / AMCA data at build (plan Caveats) before launch.
 *
 * SELL-ONLY (plan Part 2.1): Airolite is supplied by [COMPANY] and installed by
 * others. This content therefore carries NO gcReadiness module — the sell-vs-
 * install gate suppresses it structurally — and its framing is supply-only.
 */

const AC153 = "Airolite AC153 Spec Sheet, Dec 2022";
const K6776 = "Airolite K6776 Submittal, Aug 2021";
const K8206 = "Airolite K8206 Spec Sheet, Aug 2023";
const T6636 = "Airolite T6636 Spec Sheet, Apr 2022";
const ASC = "ASC4_spec_ARL.pdf, ASC6_spec_ARL.pdf";
const SUN_GEN = "Airolite Sun Controls general (ASC4/ASC6 spec sheets)";
const GRILLES = "Airolite grille spec sheets (AFG100/ABG100/CBG100/LBG100/GSG100)";
const SCREENS = "GrilleScreens_catalog_ARL.pdf";
const FINISHES = "Finishes_catalog_ARL.pdf";
const FUND = "Airolite Louver Fundamentals and Selection Considerations, April 2020";
const STRUCT = "Airolite standard product detail sheets (K8206, T6636, AC153, K6776)";

export const airoliteContent: LineContent = {
  overview:
    "Airolite architectural louvers, grilles, sun controls, and equipment screens are supplied by [COMPANY] and installed by others. The line spans drainable weather louvers (K6776, K8206), adjustable and narrow-profile louvers (T6636, AC153), extruded-aluminum airfoil sun controls (ASC4/ASC6), and a broad grille and screen family — much of it on Airolite's Qwik Ship program for 1–20 day lead times. Selection comes down to two numbers that trade against each other: free area (how much air the louver passes) and the water-penetration beginning point (how much weather it stops). Because we supply rather than install, our value-add is fast, accurate takeoffs and matching the right model, size, and finish to each opening's airflow, exposure, and code requirements.",

  applications: [
    "Mechanical intake and exhaust openings needing rated airflow with weather protection (K6776, K8206).",
    "Penthouse and rooftop equipment screening where both appearance and free area matter (grilles, ASC sun controls).",
    "Solar shading on glazed façades to cut heat gain and glare (ASC4/ASC6 airfoil blades).",
    "Decorative and security grilles — linear bar, angular bar, matrix, prism, or custom Sansome patterns (GSG100).",
    "Interior transfer-air and non-weather openings where maximum free area beats water resistance (AC153).",
  ],

  models: {
    caption:
      "Airolite covers four families — drainable weather louvers, adjustable/combination louvers, aluminum sun controls, and grilles/equipment screens. Published free area is per the AMCA 4 ft × 4 ft test opening and scales with size; the water-penetration beginning point is the free-area velocity at which water starts to pass. Match the water rating to the exposure — AC153 has no water rating and suits interior/protected openings only.",
    columns: ["Model", "Type", "Depth", "Free area (48×48)", "Water rating"],
    rows: [
      { cells: ["K6776", "Drainable louver", "6 in", "8.56 sq ft (53.5%)", "Begins > 1250 fpm"] },
      { cells: ["K8206", "Combination louver / damper (drainable)", "6 in", "7.41 sq ft (46.3%)", "Begins 1024 fpm"] },
      { cells: ["T6636", "Adjustable drainable louver", "6 in", "6.32 @ 45° / 10.87 @ 90° sq ft", "1069 fpm @ 45°; 618 @ 90°"] },
      { cells: ["AC153", "Narrow-profile louver (non-drainable)", "1.5 in", "11.20 sq ft (70.0%)", "NOT rated — interior only"] },
      { cells: ["ASC4 / ASC6", "Airfoil sun control (4 / 6 in blade)", "≤ 48 in projection", "—", "25 psf design load"] },
      { cells: ["Grilles (AFG/ABG/…)", "Aluminum grilles — airfoil, bar, custom", "2–6 in", "Varies by pattern", "≥ 25 psf wind load"] },
      { cells: ["Screens (ENCB/SCB/SV/CV)", "Equipment screens", "2–6 in", "17–55% free area", "—"] },
    ],
  },

  technical: [
    {
      title: "Louver performance",
      facts: [
        { label: "Drainable louver (K6776)", value: "53.5% free area @ 48×48; water begins > 1250 fpm; 25 psf wind load", source: K6776 },
        { label: "Combination louver/damper (K8206)", value: "46.3% free area; water begins 1024 fpm; −20 °F to +180 °F", source: K8206 },
        { label: "Adjustable louver (T6636)", value: "45° for weather (39.5%) or 90° for max airflow (67.9%); water 1069 vs 618 fpm", source: T6636 },
        { label: "Narrow-profile (AC153)", value: "70.0% free area — highest of the sourced models, but NOT water-rated", source: AC153 },
        { label: "Water-penetration test basis", value: "AMCA 500-L simulates gentle rain only — not wind-driven rain; ratings are not a weatherproof guarantee", source: FUND },
      ],
    },
    {
      title: "Sun controls",
      facts: [
        { label: "Blade / outrigger", value: "Extruded 6063-T5 airfoil blade; 6061-T6 aluminum-plate outrigger, 0.25 in", source: ASC },
        { label: "Blade spacing", value: "4 in o.c. (ASC4) / 6 in o.c. (ASC6)", source: ASC },
        { label: "Max section", value: "144 in wide × 48 in projection (standard fascia)", source: SUN_GEN },
        { label: "Design load", value: "25 psf — includes wind, snow (incl. drift), seismic, and dead load", source: ASC },
        { label: "Construction", value: "Mechanically fastened standard; welded optional", source: ASC },
      ],
    },
    {
      title: "Grilles & screens",
      facts: [
        { label: "Max single section", value: "72 × 120 in (or 120 × 72 in)", source: GRILLES },
        { label: "Min wind-load rating", value: "25 psf", source: SCREENS },
        { label: "Welds", value: "Pulsed GMAW; min 1/8 in leg × 1 in; PE-stamped 526 lb shear per fillet weld", source: GRILLES },
        { label: "Screen free-area range", value: "17% (SV962) to 55% (CV605)", source: SCREENS },
        { label: "Grille patterns", value: "Airfoil, angular/linear/continuous bar, matrix, prism, custom Sansome", source: GRILLES },
      ],
    },
    {
      title: "Finishes, warranty & supply scope",
      facts: [
        { label: "AAMA 2605 fluoropolymer (Kynar 500/Hylar 5000)", value: "10-yr warranty (20 optional); 4,000 hr salt spray", source: FINISHES },
        { label: "AAMA 2604 (wood-grain)", value: "5-yr warranty; 3,000 hr salt spray", source: FINISHES },
        { label: "AAMA 2603 (baked enamel)", value: "1-yr warranty", source: FINISHES },
        { label: "Anodize (clear / color)", value: "AAMA 611 Class I, 0.7 mil, 5-yr — not recommended on sun controls (mixed alloys)", source: FINISHES },
        { label: "Structural reinforcing / mullions", value: "For multi-section openings, NOT supplied by Airolite unless specified — size and specify separately", source: STRUCT },
      ],
    },
  ],

  // NO gcReadiness — Airolite is sell-only; the readiness module is suppressed
  // structurally by the sell-vs-install gate (plan Part 2.1).

  finishes:
    "Finishes are specified by AAMA performance tier. AAMA 2605 two- and three-coat fluoropolymer (Kynar 500 / Hylar 5000) carries a 10-year warranty (20-year optional) and 4,000-hour salt-spray resistance; AAMA 2604 die-sublimation wood-grain a 5-year; AAMA 2603 baked enamel a 1-year. Anodize (clear or color, AAMA 611 Class I) is available but not recommended on sun controls, which mix 6063-T5 and 6061-T6 alloys and can anodize to inconsistent color. The palette runs to 27 standard colors plus 6 mica colors; Airolite does not prime-coat or field-paint its products.",

  resources: [
    { label: "Airolite spec sheets, AMCA data & CSI specs", kind: "link", note: "Authoritative, manufacturer-updated — linked, not mirrored.", href: "https://www.airolite.com" },
    { label: "Airolite finishes & color catalog", kind: "link", note: "Full AAMA-tier finish and color options from the manufacturer.", href: "https://www.airolite.com" },
    { label: "[COMPANY] Airolite Qwik-Ship lead-time & takeoff guide", kind: "host", note: "Supply-only value-add — fast, accurate takeoffs and current lead times." },
    { label: "[COMPANY] louver free-area & water-rating selection worksheet", kind: "host", note: "Match model, size, and finish to each opening's airflow and exposure." },
  ],
};
