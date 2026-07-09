import { activeBrand } from "@/lib/brand";

/**
 * <Wordmark/> — the company identity as type, read from a single source
 * (activeBrand). Per plan Part 1.4 an SVG logo slot exists at
 * /public/brand/logo.svg, but the site renders the name as type so it re-themes
 * from brand.ts with no asset swap. NEVER hard-code the company name — always
 * render this component or read activeBrand.
 *
 * - variant="full" (default) → the complete name ("Integrated Architectural Solutions")
 * - variant="mark"           → the compact monogram ("IAS"), for tight headers
 */
export function Wordmark({
  as: Tag = "span",
  variant = "full",
  className = "",
}: {
  as?: "span" | "div" | "h1";
  variant?: "full" | "mark";
  className?: string;
}) {
  return (
    <Tag
      className={`font-serif tracking-tight text-ink ${className}`}
      aria-label={activeBrand.name}
    >
      {variant === "mark" ? activeBrand.mark : activeBrand.name}
    </Tag>
  );
}
