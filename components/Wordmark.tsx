import { activeBrand } from "@/lib/brand";

/**
 * <Wordmark/> — the company name as a text wordmark, read from a single
 * constant (activeBrand.name). Per plan Part 1.4, an SVG logo slot is reserved
 * at /public/brand/logo.svg; until a final mark exists we render the wordmark
 * as type. NEVER hard-code the company name — always render this component or
 * read activeBrand.name.
 */
export function Wordmark({
  as: Tag = "span",
  className = "",
}: {
  as?: "span" | "div" | "h1";
  className?: string;
}) {
  return (
    <Tag
      className={`font-serif tracking-tight text-ink ${className}`}
      aria-label={activeBrand.name}
    >
      {activeBrand.name}
    </Tag>
  );
}
