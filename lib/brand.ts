/**
 * BRAND TOKENS — single source of truth for the company's name, wordmark, and
 * visual identity. The company has NO final name yet; the placeholder is
 * [COMPANY]. Every user-facing reference to the company MUST read from this
 * module (or the CSS custom properties it emits) — never hard-code a name,
 * color, or typeface anywhere else. Swapping the final brand happens here and
 * only here. See CLAUDE.md § "Brand-token indirection".
 */

export type BrandPalette = {
  /** Human label for the palette (for the picker / docs). */
  label: string;
  /** Warm canvas background. */
  canvas: string;
  /** Slightly raised surface (cards, spec bands). */
  surface: string;
  /** Near-black body text (never pure #000). */
  ink: string;
  /** Muted secondary text. */
  inkMuted: string;
  /** Hairline 1px border color. */
  hairline: string;
  /** The single restrained accent — CTAs and semantic emphasis ONLY. */
  accent: string;
  /** Readable text color when placed on the accent. */
  accentInk: string;
};

/**
 * Two placeholder palettes per plan Part 5.1. The final brand picks one (or
 * supplies its own values) WITHOUT a refactor — the rest of the app only ever
 * references `activeBrand.palette` / the CSS variables.
 */
export const palettes = {
  /** Warm bone / off-white canvas, technical safety-orange accent. */
  bone: {
    label: "Bone",
    canvas: "#F7F6F3",
    surface: "#FBFBFA",
    ink: "#111111",
    inkMuted: "#5A5F63",
    hairline: "#EAEAEA",
    accent: "#C8552B", // restrained technical orange
    accentInk: "#FBFBFA",
  },
  /** Charcoal alternate, brand-gold accent (Euro-Wall-adjacent). */
  charcoal: {
    label: "Charcoal",
    canvas: "#2F3437",
    surface: "#373C3F",
    ink: "#F3F2EF",
    inkMuted: "#A7ACAF",
    hairline: "#454B4E",
    accent: "#B8965A", // restrained brand gold
    accentInk: "#1C1F21",
  },
} as const satisfies Record<string, BrandPalette>;

export type PaletteName = keyof typeof palettes;

export type BrandTypography = {
  /** Editorial neo-serif for headings (tight tracking). */
  serif: string;
  /** Premium sans for body. Inter/Roboto/Open Sans are BANNED (plan Part 5.1). */
  sans: string;
  /** Monospace for spec data, dimensions, CSI numbers, ratings, agent labels. */
  mono: string;
};

export type Brand = {
  /** Placeholder company name. Swap to the final name here, once. */
  name: string;
  /** Legal/footer form, if different from `name`. */
  legalName: string;
  /** One-line positioning (plan Part 1.1). */
  positioning: string;
  region: string;
  /** Which placeholder palette is active. */
  paletteName: PaletteName;
  palette: BrandPalette;
  typography: BrandTypography;
  contact: {
    phone: string;
    email: string;
  };
};

export const activeBrand: Brand = {
  name: "[COMPANY]",
  legalName: "[COMPANY], LLC",
  positioning:
    "Ohio's specialty architectural products partner — specify, supply, field-measure, install, and service.",
  region: "Ohio and surrounding regions",
  paletteName: "bone",
  palette: palettes.bone,
  typography: {
    // Actual @font-face / next-font wiring lives in app/layout.tsx; these are the
    // CSS-variable references the design system consumes.
    serif: "var(--font-serif)",
    sans: "var(--font-sans)",
    mono: "var(--font-mono)",
  },
  contact: {
    phone: "(000) 000-0000",
    email: "hello@[company].com",
  },
};

/**
 * Emit the active palette as CSS custom properties. Injected once in the root
 * layout so every component can reference `var(--color-*)`; changing the brand
 * re-themes the whole site from this one object.
 */
export function brandCssVars(brand: Brand = activeBrand): string {
  const p = brand.palette;
  return [
    `--color-canvas:${p.canvas}`,
    `--color-surface:${p.surface}`,
    `--color-ink:${p.ink}`,
    `--color-ink-muted:${p.inkMuted}`,
    `--color-hairline:${p.hairline}`,
    `--color-accent:${p.accent}`,
    `--color-accent-ink:${p.accentInk}`,
  ].join(";");
}
