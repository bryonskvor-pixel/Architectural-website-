import Link from "next/link";

/**
 * PageScaffold — consistent shell for the many content pages that are route
 * stubs in Session 1. Gives each a title, an intent line describing what the
 * finished page must contain (straight from the plan), and its phase status.
 * Replace the body per page as real content lands.
 */
export function PageScaffold({
  eyebrow,
  title,
  intent,
  phase = "Phase 1",
  children,
  crumbs,
}: {
  eyebrow?: string;
  title: string;
  intent: string;
  phase?: string;
  children?: React.ReactNode;
  crumbs?: { href: string; label: string }[];
}) {
  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      {crumbs && crumbs.length > 0 && (
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap gap-2 font-mono text-[11px] text-ink-muted">
            {crumbs.map((c) => (
              <li key={c.href}>
                <Link href={c.href} className="hover:text-ink">
                  {c.label}
                </Link>
                <span className="ml-2 text-hairline">/</span>
              </li>
            ))}
          </ol>
        </nav>
      )}

      {eyebrow && (
        <p className="font-mono text-xs uppercase tracking-wide text-ink-muted">
          {eyebrow}
        </p>
      )}
      <h1 className="mt-3 font-serif text-4xl leading-tight text-ink md:text-5xl">
        {title}
      </h1>

      <div className="mt-8 border-l-2 border-hairline pl-5">
        <p className="font-mono text-[11px] uppercase tracking-wide text-ink-muted">
          Scaffold · {phase}
        </p>
        <p className="mt-2 text-lg leading-relaxed text-ink-muted">{intent}</p>
      </div>

      {children && <div className="mt-12">{children}</div>}
    </div>
  );
}
