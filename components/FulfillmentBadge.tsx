import type { ProductLine } from "@/lib/products";
import { isSellOnly } from "@/lib/products";

/**
 * The sell-vs-install badge (plan Part 2.1). Install lines carry a
 * "Supply + Install + Service" badge; Airolite (sell-only) carries a distinct
 * "We supply — installed by others" badge. Reads the structural flag from the
 * product model so the two can never drift.
 */
export function FulfillmentBadge({ line }: { line: ProductLine }) {
  const sellOnly = isSellOnly(line);
  return (
    <span
      className={`inline-flex items-center border px-2.5 py-1 font-mono text-[11px] uppercase tracking-wide ${
        sellOnly
          ? "border-ink-muted text-ink-muted"
          : "border-accent text-accent"
      }`}
    >
      {sellOnly ? "Supply only — installed by others" : "Supply + Install + Service"}
    </span>
  );
}
