import type { BrandSlug } from "@/lib/products";
import type { LineContent } from "@/lib/content/types";
import { skyfoldContent } from "@/lib/content/skyfold";

/**
 * Content registry. A line with an entry here renders the full spec-forward
 * template; lines without one render the placeholder scaffold. Skyfold is the
 * Session 2 reference implementation; the other four are authored later from
 * their D1 data using this same shape.
 */
const registry: Partial<Record<BrandSlug, LineContent>> = {
  skyfold: skyfoldContent,
};

export function getLineContent(slug: BrandSlug): LineContent | undefined {
  return registry[slug];
}
