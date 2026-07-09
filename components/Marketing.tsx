import Link from "next/link";

/**
 * Marketing section primitives — the shared vocabulary for the content pages
 * (process, resources, solutions, about, contact), in the plan's Part 5 design
 * language: warm bone canvas, editorial serif headings, monospace labels/spec
 * data, hairline 1px borders, depth via grid layering only. No shadows, no
 * gradients. Server components — no interactivity (the agent + RFQ form are the
 * only client islands). Mirrors the idioms proven on the Skyfold product page
 * and the home page so every page reads as one system.
 */

export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`mx-auto max-w-5xl px-6 ${className}`}>{children}</div>;
}

export function Breadcrumbs({
  crumbs,
}: {
  crumbs: { href: string; label: string }[];
}) {
  return (
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
  );
}

/** Finished-page hero: eyebrow + serif title + lead paragraph + optional actions. */
export function PageHero({
  eyebrow,
  title,
  lead,
  crumbs,
  children,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  crumbs?: { href: string; label: string }[];
  children?: React.ReactNode;
}) {
  return (
    <header className="border-b border-hairline">
      <Container className="py-16 md:py-20">
        {crumbs && crumbs.length > 0 && <Breadcrumbs crumbs={crumbs} />}
        {eyebrow && (
          <p className="font-mono text-xs uppercase tracking-wide text-ink-muted">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-3 max-w-3xl font-serif text-4xl leading-[1.1] text-ink md:text-5xl">
          {title}
        </h1>
        {lead && (
          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-ink-muted">
            {lead}
          </p>
        )}
        {children && <div className="mt-9">{children}</div>}
      </Container>
    </header>
  );
}

/** A titled content band. Mono eyebrow (optional) over a serif title. */
export function Section({
  eyebrow,
  title,
  children,
  className = "",
}: {
  eyebrow?: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`border-t border-hairline ${className}`}>
      <Container className="py-16">
        {eyebrow && (
          <p className="font-mono text-xs uppercase tracking-wide text-ink-muted">
            {eyebrow}
          </p>
        )}
        {title && (
          <h2 className="mt-2 max-w-3xl font-serif text-3xl leading-tight text-ink">
            {title}
          </h2>
        )}
        <div className={eyebrow || title ? "mt-8" : ""}>{children}</div>
      </Container>
    </section>
  );
}

/** Editorial prose column with comfortable measure. Pass <p> children. */
export function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-2xl space-y-5 text-lg leading-relaxed text-ink [&_a]:text-accent [&_a:hover]:underline">
      {children}
    </div>
  );
}

/** Hairline-layered card grid (depth via 1px gaps, no shadows). */
export function CardGrid({
  children,
  cols = 2,
}: {
  children: React.ReactNode;
  cols?: 2 | 3;
}) {
  return (
    <div
      className={`grid gap-px border border-hairline bg-hairline ${
        cols === 3 ? "md:grid-cols-3" : "md:grid-cols-2"
      }`}
    >
      {children}
    </div>
  );
}

export function Card({
  title,
  kicker,
  href,
  children,
}: {
  title: string;
  kicker?: string;
  href?: string;
  children?: React.ReactNode;
}) {
  const inner = (
    <>
      {kicker && (
        <p className="font-mono text-[11px] uppercase tracking-wide text-ink-muted">
          {kicker}
        </p>
      )}
      <h3 className={`font-serif text-2xl text-ink ${kicker ? "mt-2" : ""}`}>
        {title}
        {href && <span className="ml-1.5 text-accent">↗</span>}
      </h3>
      {children && <div className="mt-3 text-ink-muted">{children}</div>}
    </>
  );
  if (href) {
    return (
      <Link
        href={href}
        className="group block bg-canvas p-8 no-underline transition-colors hover:bg-surface"
      >
        {inner}
      </Link>
    );
  }
  return <div className="bg-canvas p-8">{inner}</div>;
}

/** Team roster grid — optional square photo + name + role + optional meta/bio. */
export function TeamGrid({
  members,
}: {
  members: {
    name: string;
    role: string;
    bio?: string;
    photo?: string;
    meta?: string;
  }[];
}) {
  return (
    <div className="grid gap-px border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
      {members.map((m) => (
        <div key={m.name} className="bg-canvas p-6">
          {m.photo && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={m.photo}
              alt={m.name}
              className="mb-4 aspect-square w-full max-w-[9rem] object-cover"
            />
          )}
          <h3 className="font-serif text-xl text-ink">{m.name}</h3>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-wide text-accent">
            {m.role}
          </p>
          {m.meta && (
            <p className="mt-1 font-mono text-[11px] uppercase tracking-wide text-ink-muted">
              {m.meta}
            </p>
          )}
          {m.bio && (
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">{m.bio}</p>
          )}
        </div>
      ))}
    </div>
  );
}

/** Numbered process steps — mono index, serif title, muted body + optional meta. */
export function NumberedSteps({
  steps,
}: {
  steps: { title: string; body: string; meta?: string }[];
}) {
  return (
    <ol className="divide-y divide-hairline border-y border-hairline">
      {steps.map((s, i) => (
        <li key={i} className="flex gap-6 py-6">
          <span className="mt-1 shrink-0 font-mono text-sm text-accent">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div>
            <h3 className="font-serif text-xl text-ink">{s.title}</h3>
            <p className="mt-1.5 max-w-2xl leading-relaxed text-ink-muted">
              {s.body}
            </p>
            {s.meta && (
              <p className="mt-2 font-mono text-[11px] uppercase tracking-wide text-ink-muted">
                {s.meta}
              </p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

/** Accent-bordered callout with a mono label header (matches the GC module). */
export function Callout({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-accent">
      <div className="border-b border-hairline bg-surface px-6 py-3">
        <span className="font-mono text-[11px] uppercase tracking-wide text-accent">
          {label}
        </span>
      </div>
      <div className="px-6 py-6 leading-relaxed text-ink-muted">{children}</div>
    </div>
  );
}

/** Simple checklist with mono ☐ markers. */
export function Checklist({
  items,
}: {
  items: { label: string; detail?: string }[];
}) {
  return (
    <ul className="divide-y divide-hairline border-y border-hairline">
      {items.map((it, i) => (
        <li key={i} className="flex gap-4 py-4">
          <span className="mt-0.5 font-mono text-xs text-accent">☐</span>
          <div>
            <p className="text-ink">{it.label}</p>
            {it.detail && (
              <p className="mt-1 text-sm text-ink-muted">{it.detail}</p>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}

/** Hairline data table with a monospace values column. */
export function DataTable({
  columns,
  rows,
  caption,
}: {
  columns: string[];
  rows: string[][];
  caption?: string;
}) {
  return (
    <div>
      <div className="overflow-x-auto border border-hairline">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-hairline bg-surface">
              {columns.map((h) => (
                <th
                  key={h}
                  className="px-3 py-2.5 font-mono text-[11px] uppercase tracking-wide text-ink-muted"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-b border-hairline last:border-b-0">
                {r.map((cell, j) => (
                  <td
                    key={j}
                    className={
                      j === 0
                        ? "px-3 py-2.5 text-sm text-ink"
                        : "px-3 py-2.5 font-mono text-sm text-ink-muted"
                    }
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {caption && <p className="mt-3 text-sm text-ink-muted">{caption}</p>}
    </div>
  );
}

/** FAQ accordion — native <details>, no client JS. */
export function FaqList({
  items,
}: {
  items: { q: string; a: React.ReactNode }[];
}) {
  return (
    <div className="divide-y divide-hairline border-y border-hairline">
      {items.map((it, i) => (
        <details key={i} className="group py-4">
          <summary className="flex cursor-pointer items-center justify-between gap-4 font-serif text-lg text-ink marker:content-['']">
            {it.q}
            <span className="font-mono text-accent transition-transform group-open:rotate-45">
              +
            </span>
          </summary>
          <div className="mt-3 max-w-2xl leading-relaxed text-ink-muted [&_a]:text-accent [&_a:hover]:underline">
            {it.a}
          </div>
        </details>
      ))}
    </div>
  );
}

/** Accent (primary) or hairline (outline) call-to-action link. */
export function ButtonLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline";
}) {
  const base =
    "inline-block px-5 py-2.5 font-mono text-xs uppercase tracking-wide no-underline";
  const styles =
    variant === "primary"
      ? "border border-accent bg-accent text-accent-ink hover:opacity-90"
      : "border border-hairline text-ink hover:border-accent";
  const external = href.startsWith("http");
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} ${styles}`}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={`${base} ${styles}`}>
      {children}
    </Link>
  );
}

/** Closing CTA band on a raised surface. */
export function CtaBand({
  title,
  body,
  primary,
  secondary,
}: {
  title: string;
  body?: string;
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  return (
    <section className="border-t border-hairline bg-surface">
      <Container className="py-16">
        <h2 className="max-w-3xl font-serif text-3xl leading-tight text-ink">
          {title}
        </h2>
        {body && <p className="mt-3 max-w-2xl text-ink-muted">{body}</p>}
        <div className="mt-6 flex flex-wrap gap-3">
          <ButtonLink href={primary.href}>{primary.label}</ButtonLink>
          {secondary && (
            <ButtonLink href={secondary.href} variant="outline">
              {secondary.label}
            </ButtonLink>
          )}
        </div>
      </Container>
    </section>
  );
}
