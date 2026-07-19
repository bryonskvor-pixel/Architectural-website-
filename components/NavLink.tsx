"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Header nav link with an accent underline that sweeps in on hover (transform
 * scaleX, styles in globals.css under .nav-link) and stays lit on the active
 * section. `match` widens the active test to a route prefix (e.g. Resources
 * links to /resources/spec-library but lights for all /resources/*).
 */
export function NavLink({
  href,
  match,
  children,
}: {
  href: string;
  match?: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const base = match ?? href;
  const active =
    pathname === href || pathname === base || pathname.startsWith(`${base}/`);
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`nav-link font-mono text-xs uppercase tracking-wide no-underline transition-colors ${
        active ? "text-ink" : "text-ink-muted hover:text-ink"
      }`}
    >
      {children}
    </Link>
  );
}
