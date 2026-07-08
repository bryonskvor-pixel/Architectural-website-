import type { BrandSlug } from "@/lib/products";

/**
 * Pilot rollout gate, kept in its own SDK-free module so server components and
 * the client can check "is this agent live?" without importing the Claude
 * client (which must never reach the browser bundle). config.ts imports this.
 *
 * Plan RECOMMENDATIONS: launched Skyfold + Smoke Guard first (Session 3); Session
 * 4 expands to the full roster once each brand's page content is authored and
 * its cost + cited-answer quality are validated by a live test.
 */
export const PILOT_BRANDS: readonly BrandSlug[] = [
  "skyfold",
  "smoke-guard",
  "modernfold",
  "euro-wall",
  "airolite",
];

export function isAgentEnabled(slug: BrandSlug): boolean {
  return PILOT_BRANDS.includes(slug);
}
