import Link from "next/link";
import { Wordmark } from "@/components/Wordmark";
import { NavLink } from "@/components/NavLink";
import { activeBrand, isPlaceholderPhone } from "@/lib/brand";
import { solutionCategories } from "@/lib/products";

/**
 * Persistent header. Nav is organized by problem/solution category (plan Part 2)
 * with a resources-forward secondary emphasis for specifiers, plus an always-on
 * Request a Quote / RFI CTA and phone (plan Part 2.2). Sticky, on a slightly
 * translucent canvas so content scrolling beneath reads as grid layering;
 * NavLink carries the accent underline sweep + active-section state.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-canvas/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-baseline gap-2 no-underline">
          <Wordmark variant="mark" className="text-xl font-semibold" />
          <Wordmark
            variant="full"
            className="hidden text-sm text-ink-muted lg:inline"
          />
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-6 md:flex"
        >
          {solutionCategories.map((c) => (
            <NavLink key={c.slug} href={`/solutions/${c.slug}`}>
              {c.title}
            </NavLink>
          ))}
          <NavLink href="/resources/spec-library" match="/resources">
            Resources
          </NavLink>
          <NavLink href="/process">Process</NavLink>
          <NavLink href="/about">About</NavLink>
        </nav>

        <div className="flex items-center gap-4">
          {!isPlaceholderPhone() && (
            <a
              href={`tel:${activeBrand.contact.phone.replace(/[^0-9+]/g, "")}`}
              className="hidden font-mono text-xs text-ink-muted hover:text-ink sm:inline"
            >
              {activeBrand.contact.phone}
            </a>
          )}
          <Link
            href="/contact/request-quote"
            className="border border-accent bg-accent px-4 py-2 font-mono text-xs uppercase tracking-wide text-accent-ink no-underline transition-[opacity,transform] duration-200 hover:-translate-y-px hover:opacity-90"
          >
            Request a Quote
          </Link>
        </div>
      </div>
    </header>
  );
}
