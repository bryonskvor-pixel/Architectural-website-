import type { LineContent } from "@/lib/content/types";

/**
 * EURO-WALL content — architectural glass wall systems (CSI 08 43 33). Every
 * number below is drawn from the authoritative Euro-Wall rows in the
 * pm-intelligence-agent D1 parameter store (brand = 'Euro-Wall'); `source`
 * strings match the D1 `source_doc` values so the page and the catalog agent
 * cite the same documents. Confirm against the manufacturer's current published
 * spec and Florida Product Approvals at build (plan Caveats) before launch.
 *
 * Glass walls are not acoustic products, so the models table uses the free-form
 * column layout (approvals / sizes / design pressure) rather than the STC-pair
 * layout used by the operable-partition lines.
 */

const CT = "vista_ct_brochure_v1_102025.pdf";
const TL = "vista_tl_brochure_v1_102025.pdf";
const DS = "ew-print-directsetconfigurations-v02.pdf";
const FOLD_C3 = "vista_foldc3_brochure_v1_102025.pdf";
const FOLD_C5 = "vista_foldc5_brochure_v1_102025final.pdf";
const PIVOT = "vista_pivot_brochure_v1_102025.pdf";
const MULTI = "vistafold_multi-directional-final.pdf";
const MS_EXTR = "vista_ms_extrusionsheet_v1_102025.pdf";
const GUIDES = "Euro-Wall install guides (all lines)";
const PB_HEADER = "PM Master Playbook Sec 2 (Euro-Wall header rigidity, L/720)";
const PB_SILL = "PM Master Playbook Sec 2 (Euro-Wall sill integration)";
const PB_DP = "PM Master Playbook Sec 2 (Euro-Wall code compliance / DP taper)";
const PB_POCKET = "Remediation Work Order canonical failure modes; Euro-Wall install guides";

export const euroWallContent: LineContent = {
  overview:
    "Euro-Wall's Vista systems are architectural glass walls for signature openings — impact-rated folding (Fold C3/C5), multi-slide (MS), and pivot doors that open a room fully to the outside, plus fixed thin-line (TL) and direct-set (DS) glass walls and the CT operable window. The impact models carry Florida Product Approvals for High-Velocity Hurricane Zone (HVHZ) use, and the thin-line system spans single lites up to 16'-6\" behind only a 2 in frame. These are heavy, weather-critical assemblies: the header must hold L/720 under the full glass load, the sill needs engineered drainage, and published design pressures taper at larger sizes — so the structural and waterproofing details are coordinated before glass is ordered.",

  applications: [
    "Indoor-outdoor living and hospitality openings — restaurants, resorts, and residences that open an entire wall to a patio (Fold, MS).",
    "Coastal and hurricane-zone projects requiring HVHZ impact approval (Fold C3, Pivot, TL, CT).",
    "Storefront and signature entries wanting a large pivot door or a minimal-frame glass wall (Pivot, TL).",
    "Fixed, curtain-wall-style glazing with the largest possible lites and the thinnest sightlines (TL, up to 16'-6\").",
    "Operable windows integrated into the same frame family and finishes as the door systems (CT casement/awning).",
  ],

  models: {
    caption:
      "The Vista line covers folding (Fold C3/C5), multi-slide (MS), pivot, and fixed (DS/TL) glass systems plus the CT operable window. Impact models carry Florida Product Approvals (FL#) for HVHZ use; design-pressure ratings taper above certain heights, so confirm the DP at the actual opening size — not the brochure headline.",
    columns: ["Model", "Type", "Max size / panel", "Design pressure", "Approval"],
    rows: [
      { cells: ["Fold C3", "Impact-rated aluminum folding door", "Shared Vista Fold sizing", "Shared Vista Fold DP", "HVHZ impact · FL17838"] },
      { cells: ["Fold C5", "Thermally-broken folding door", "Shared Vista Fold sizing", "Shared Vista Fold DP", "FL27023"] },
      { cells: ["Fold Multi-Directional", "Bi-directional fold-and-slide", "180 in H / 52 in W / 350 lb", "Shared Vista Fold DP", "Double-egress capable"] },
      { cells: ["MS", "Multi-slide, 2–5 track", "Per configuration (OX/XO/OXXO)", "Impact & non-impact", "See config chart"] },
      { cells: ["Pivot", "Impact-rated pivot door", "Four swing orientations", "—", "HVHZ impact · FL22410"] },
      { cells: ["DS", "Fixed direct-set glass", "Up to 6-lite / trapezoid (≤25°)", "—", "HVHZ · FL46965"] },
      { cells: ["TL", "Thin-line fixed glass wall", "16'-6\" single lite; 198 × 198 in", "Up to 90 psf", "HVHZ & WZ3 impact · FL47174"] },
      { cells: ["CT", "Casement / awning operable window", "120 × 52 in single unit", "Up to 80 psf", "HVHZ & WZ3 · FL47078"] },
    ],
  },

  technical: [
    {
      title: "Ratings & approvals",
      facts: [
        { label: "Fold C3", value: "HVHZ impact rated, FL17838", source: FOLD_C3 },
        { label: "Fold C5", value: "Thermally broken, FL27023 (no HVHZ-specific sills)", source: FOLD_C5 },
        { label: "Pivot", value: "HVHZ impact rated, FL22410", source: PIVOT },
        { label: "DS (fixed)", value: "FL46965", source: DS },
        { label: "TL (fixed)", value: "HVHZ & WZ3 impact, FL47174 — up to 90 psf DP with 1-1/8 in glass", source: TL },
        { label: "CT (window)", value: "HVHZ & WZ3, FL47078 — 80 psf DP plateau through 96 in height", source: CT },
      ],
    },
    {
      title: "Sizes & capacities",
      facts: [
        { label: "TL max single lite", value: "16'-6\" tall and wide; unlimited lites per opening", source: TL },
        { label: "TL single-unit max", value: "198 × 198 in (HVHZ & WZ3, impact rated)", source: TL },
        { label: "CT single-unit max", value: "120 × 52 in; multi-unit HVHZ 96 × 52 in", source: CT },
        { label: "Fold Multi-Directional panel", value: "180 in H non-impact / 168 in impact, 52 in W, 350 lb", source: MULTI },
        { label: "MS track configurations", value: "2–5 track (4-3/16 in to 11-3/8 in wide)", source: MS_EXTR },
      ],
    },
    {
      title: "Structural & install tolerances",
      facts: [
        { label: "Max header deflection", value: "3/16 in (Playbook standard L/720 under full glass load)", source: PB_HEADER },
        { label: "Sill level tolerance", value: "≤ 1/16 in sag at center span, no bow permitted", source: GUIDES },
        { label: "Header screw min penetration", value: "1.5 in", source: GUIDES },
        { label: "Perimeter sealant", value: "DOW 795 or 100% silicone; frame fully embedded before setting", source: GUIDES },
        { label: "Install crew", value: "2 people under 8 ft; 4 people over 8 ft", source: GUIDES },
        { label: "Glass thickness", value: "1 in IG (CT); 1-1/8 in (TL)", source: TL },
      ],
    },
    {
      title: "Finishes, warranty & maintenance",
      facts: [
        { label: "Standard finish", value: "AAMA 2605 Kynar — White, Silver, Bronze, Black", source: CT },
        { label: "Custom / premium", value: "Custom powder coat/Kynar, AAMA 2604 faux woodgrain, interior wood-clad veneer", source: CT },
        { label: "Warranty", value: "10-year limited", source: CT },
        { label: "Maintenance (warranty-tied)", value: "Hardware lube every 3 mo (monthly within 5 mi of salt water); Boeshield T-9 every 6 mo (3 mo marine)", source: GUIDES },
        { label: "Protective film", value: "Remove within 30 days of delivery to avoid finish damage", source: GUIDES },
      ],
    },
  ],

  gcReadiness: {
    intro:
      "Euro-Wall glass systems are heavy, weather-critical, and stack into a pocket — the header, sill, floor relationship, and design pressure all have to be right in the documents before glass is ordered. These are the coordination items that most often surface as change orders.",
    items: [
      { label: "Pocket / stacking bay detailed", detail: "Pocket framing or a panel-stacking bay shown on plan for panel storage — the exact detail most often value-engineered out between drawing sets, leaving panels nowhere to stack.", source: PB_POCKET },
      { label: "Header sized to L/720", detail: "Header held to L/720 (≤ 3/16 in) under the full glass weight — a sagging header pinches the panels and locks them up, requiring a structural retrofit with glass already in place.", source: PB_HEADER },
      { label: "Sill detail with drainage", detail: "A sill detail with drainage/weep provisions and a sill pan (supplied by others) at exterior conditions — the sill liner is destructive to remove and redo.", source: PB_SILL },
      { label: "Finished-floor relationship dimensioned", detail: "Track recess depth or flush condition dimensioned against finished-floor elevation, so the track sits neither proud (trip/ADA issue) nor buried (panel binding).", source: PB_SILL },
      { label: "Design pressure checked at actual size", detail: "DP requirement verified against the model DP chart at the real opening size — headline/brochure DP numbers taper above height thresholds, and an oversize unit fails engineering review.", source: PB_DP },
    ],
  },

  finishes:
    "Standard finish is AAMA 2605 Kynar in White, Sunstorm/Arcadia Silver, Bronze, or Black; custom powder-coat and Kynar colors and an AAMA 2604 die-sublimation faux-woodgrain are available, as is an interior wood-clad veneer (mahogany/sapele, white oak, and exotic species). All systems carry a 10-year limited warranty that is conditioned on documented maintenance — hardware lubrication every three months (monthly within five miles of salt water) and Boeshield T-9 reapplication every six months. Protective film must be removed within 30 days of delivery to avoid finish damage, and wood-clad veneers must be sealed within 36 hours of delivery unless kept in climate-controlled storage.",

  resources: [
    { label: "Euro-Wall Vista brochures, install guides & FL approvals", kind: "link", note: "Authoritative, manufacturer-updated — linked, not mirrored.", href: "https://www.euro-wall.com" },
    { label: "Vista 3-part specs (CSI 08 43 33)", kind: "link", note: "Download the current guide specs from the manufacturer / ARCAT.", href: "https://www.arcat.com" },
    { label: "[COMPANY] Euro-Wall header, sill & design-pressure readiness checklist", kind: "host", note: "Dealer value-add — the GC coordination list above as a one-page PDF." },
    { label: "[COMPANY] regional Euro-Wall installations", kind: "host", note: "Ohio project photography and references." },
  ],
};
