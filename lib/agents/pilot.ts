import type { BrandSlug } from "@/lib/products";

/**
 * Pilot rollout gate, kept in its own SDK-free module so server components and
 * the client can check "is this agent live?" without importing the Claude
 * client (which must never reach the browser bundle). config.ts imports this.
 *
 * Plan RECOMMENDATIONS: launch Skyfold + Smoke Guard first, then expand once
 * cost + cited-answer rate are validated.
 */
export const PILOT_BRANDS: readonly BrandSlug[] = ["skyfold", "smoke-guard"];

export function isAgentEnabled(slug: BrandSlug): boolean {
  return PILOT_BRANDS.includes(slug);
}
