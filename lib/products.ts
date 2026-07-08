/**
 * PRODUCT LINES & SOLUTION CATEGORIES — the structural spine of the site.
 *
 * The five lines and their sell-vs-install status are defined here ONCE and
 * drive routing, navigation, the product-line template, and the agent config.
 * The `fulfillment` flag is the single enforcement point for the plan's
 * hard rule (Part 2.1): Airolite is SELL-ONLY. Anything that shows install /
 * field-measure modules or routes to "schedule field measure" must gate on
 * `line.fulfillment === "sell-and-install"`. See CLAUDE.md.
 *
 * Content here is PLACEHOLDER (Session 1 scaffold). Real spec bands, model
 * tables, and technical data land in a later session, sourced from the
 * manufacturer docs already ingested in the pm-intelligence-agent data tier.
 */

export type Fulfillment = "sell-and-install" | "sell-only";

export type BrandSlug =
  | "modernfold"
  | "skyfold"
  | "euro-wall"
  | "smoke-guard"
  | "airolite";

export type CategorySlug =
  | "space-flexibility"
  | "glass-wall-systems"
  | "fire-smoke-containment"
  | "louvers-sun-control";

export type SpecFact = { label: string; value: string };

export type ProductLine = {
  slug: BrandSlug;
  /** Manufacturer/product-line name (NOT the dealer company — that's brand.ts). */
  name: string;
  category: CategorySlug;
  fulfillment: Fulfillment;
  /** Primary CSI section (confirm against current 3-part specs at build — plan Caveats). */
  csi: string;
  /** One-line positioning for the hero (plan Part 3). */
  tagline: string;
  /** "At a glance" spec band facts — placeholder values for the scaffold. */
  ataGlance: SpecFact[];
  /** Vectorize index that backs this line's agent (populated in pm-intelligence-agent). */
  vectorizeIndex: string;
};

export type SolutionCategory = {
  slug: CategorySlug;
  title: string;
  /** Problem-framed blurb (nav organized by problem/solution — plan Part 2). */
  blurb: string;
  lines: BrandSlug[];
};

export const solutionCategories: SolutionCategory[] = [
  {
    slug: "space-flexibility",
    title: "Space Flexibility",
    blurb:
      "Operable partitions and vertically-retracting walls that turn one room into many — on demand, with acoustic separation.",
    lines: ["modernfold", "skyfold"],
  },
  {
    slug: "glass-wall-systems",
    title: "Glass Wall Systems",
    blurb:
      "Folding, sliding, and pivoting glass walls for signature openings — indoor-outdoor living and high-performance exteriors.",
    lines: ["euro-wall"],
  },
  {
    slug: "fire-smoke-containment",
    title: "Fire + Smoke Containment",
    blurb:
      "Code-driven elevator and opening protection — invisible-until-deployed smoke and fire curtains.",
    lines: ["smoke-guard"],
  },
  {
    slug: "louvers-sun-control",
    title: "Louvers + Sun Control",
    blurb:
      "Architectural louvers, grilles, sun controls, and equipment screens — supplied fast. (We supply; installed by others.)",
    lines: ["airolite"],
  },
];

export const productLines: Record<BrandSlug, ProductLine> = {
  modernfold: {
    slug: "modernfold",
    name: "Modernfold",
    category: "space-flexibility",
    fulfillment: "sell-and-install",
    csi: "10 22 26",
    tagline: "Flexible rooms, wherever you need them.",
    ataGlance: [
      { label: "CSI", value: "10 22 26" },
      { label: "STC (Encore)", value: "up to 56" },
      { label: "Max height", value: "≈30 ft" },
      { label: "Fulfillment", value: "Supply + Install + Service" },
    ],
    vectorizeIndex: "pm-intel-modernfold",
  },
  skyfold: {
    slug: "skyfold",
    name: "Skyfold",
    category: "space-flexibility",
    fulfillment: "sell-and-install",
    csi: "10 22 39",
    tagline: "The wall that vanishes into the ceiling.",
    ataGlance: [
      { label: "CSI", value: "10 22 39" },
      { label: "STC", value: "up to 60 (RW 59)" },
      { label: "Floor tracks", value: "none" },
      { label: "Fulfillment", value: "Supply + Install + Service" },
    ],
    vectorizeIndex: "pm-intel-skyfold",
  },
  "euro-wall": {
    slug: "euro-wall",
    name: "Euro-Wall",
    category: "glass-wall-systems",
    fulfillment: "sell-and-install",
    csi: "08 43 33",
    tagline: "Disappearing glass walls for signature openings.",
    ataGlance: [
      { label: "CSI", value: "08 43 33" },
      { label: "Panels", value: "up to ≈14 ft" },
      { label: "Rating", value: "Miami-Dade / HVHZ" },
      { label: "Fulfillment", value: "Supply + Install + Service" },
    ],
    vectorizeIndex: "pm-intel-euro-wall",
  },
  "smoke-guard": {
    slug: "smoke-guard",
    name: "Smoke Guard",
    category: "fire-smoke-containment",
    fulfillment: "sell-and-install",
    csi: "IBC §3006 / 08 series",
    tagline: "Code compliance without compromising the design.",
    ataGlance: [
      { label: "Code", value: "IBC §3006, §717/§710" },
      { label: "Listings", value: "UL 1784 / UL 10D" },
      { label: "Models", value: "M200–M4000" },
      { label: "Fulfillment", value: "Supply + Install + Service" },
    ],
    vectorizeIndex: "pm-intel-smoke-guard",
  },
  airolite: {
    slug: "airolite",
    name: "Airolite",
    category: "louvers-sun-control",
    fulfillment: "sell-only",
    csi: "08 90 00",
    tagline: "Architectural louvers and sun control, supplied fast.",
    ataGlance: [
      { label: "CSI", value: "08 90 00" },
      { label: "Tested", value: "AMCA 500-L / 540 / 550" },
      { label: "Lead time", value: "Qwik Ship 1–20 day" },
      { label: "Fulfillment", value: "Supply only — installed by others" },
    ],
    vectorizeIndex: "pm-intel-airolite",
  },
};

export const brandSlugs = Object.keys(productLines) as BrandSlug[];

export function getLine(slug: string): ProductLine | undefined {
  return (productLines as Record<string, ProductLine>)[slug];
}

export function getCategory(slug: string): SolutionCategory | undefined {
  return solutionCategories.find((c) => c.slug === slug);
}

/** THE sell-vs-install gate. Use everywhere install/field-measure UI is decided. */
export function isSellOnly(line: ProductLine): boolean {
  return line.fulfillment === "sell-only";
}
