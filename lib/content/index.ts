import type { BrandSlug } from "@/lib/products";
import type { LineContent } from "@/lib/content/types";
import { skyfoldContent } from "@/lib/content/skyfold";
import { modernfoldContent } from "@/lib/content/modernfold";
import { euroWallContent } from "@/lib/content/euro-wall";
import { smokeGuardContent } from "@/lib/content/smoke-guard";
import { airoliteContent } from "@/lib/content/airolite";

/**
 * Content registry. A line with an entry here renders the full spec-forward
 * template; lines without one render the placeholder scaffold. Skyfold is the
 * Session 2 reference implementation; Modernfold, Euro-Wall, Smoke Guard, and
 * Airolite were authored in Session 4 from their D1 data using this same shape.
 */
const registry: Partial<Record<BrandSlug, LineContent>> = {
  skyfold: skyfoldContent,
  modernfold: modernfoldContent,
  "euro-wall": euroWallContent,
  "smoke-guard": smokeGuardContent,
  airolite: airoliteContent,
};

export function getLineContent(slug: BrandSlug): LineContent | undefined {
  return registry[slug];
}
