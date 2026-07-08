import Link from "next/link";
import { solutionCategories, productLines } from "@/lib/products";
import { PageScaffold } from "@/components/PageScaffold";

export const metadata = { title: "Solutions" };

export default function SolutionsPage() {
  return (
    <PageScaffold
      eyebrow="Solutions"
      title="Organized by the problem you're solving"
      intent="Top-level solutions are framed by problem/solution category (proven by the Powers Products model), with product lines nested underneath."
      crumbs={[{ href: "/", label: "Home" }]}
    >
      <div className="grid gap-6 md:grid-cols-2">
        {solutionCategories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/solutions/${cat.slug}`}
            className="block border border-hairline p-6 no-underline hover:border-accent"
          >
            <h2 className="font-serif text-2xl text-ink">{cat.title}</h2>
            <p className="mt-2 text-sm text-ink-muted">{cat.blurb}</p>
            <p className="mt-4 font-mono text-[11px] text-ink-muted">
              {cat.lines.map((s) => productLines[s].name).join(" · ")}
            </p>
          </Link>
        ))}
      </div>
    </PageScaffold>
  );
}
