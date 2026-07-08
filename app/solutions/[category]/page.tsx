import Link from "next/link";
import { notFound } from "next/navigation";
import {
  solutionCategories,
  getCategory,
  productLines,
} from "@/lib/products";
import { PageScaffold } from "@/components/PageScaffold";
import { FulfillmentBadge } from "@/components/FulfillmentBadge";
import { CsiChip } from "@/components/SpecBand";

export function generateStaticParams() {
  return solutionCategories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = getCategory(category);
  return { title: cat?.title ?? "Solutions" };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) notFound();

  return (
    <PageScaffold
      eyebrow="Solutions"
      title={cat.title}
      intent={cat.blurb}
      crumbs={[
        { href: "/", label: "Home" },
        { href: "/solutions", label: "Solutions" },
      ]}
    >
      <div className="grid gap-6">
        {cat.lines.map((slug) => {
          const line = productLines[slug];
          return (
            <Link
              key={slug}
              href={`/solutions/${cat.slug}/${line.slug}`}
              className="flex flex-wrap items-center justify-between gap-4 border border-hairline p-6 no-underline hover:border-accent"
            >
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="font-serif text-2xl text-ink">{line.name}</h2>
                  <CsiChip csi={line.csi} />
                </div>
                <p className="mt-2 text-sm text-ink-muted">{line.tagline}</p>
              </div>
              <FulfillmentBadge line={line} />
            </Link>
          );
        })}
      </div>
    </PageScaffold>
  );
}
