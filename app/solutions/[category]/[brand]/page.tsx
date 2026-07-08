import { notFound } from "next/navigation";
import { productLines, getLine } from "@/lib/products";
import { ProductLineTemplate } from "@/components/ProductLineTemplate";

/**
 * Product-line page. One shared template (ProductLineTemplate) rendered for
 * every brand, driven by the product model. The [category]/[brand] pair is
 * validated so only real combinations render — a brand under the wrong
 * category 404s.
 */
export function generateStaticParams() {
  return Object.values(productLines).map((line) => ({
    category: line.category,
    brand: line.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; brand: string }>;
}) {
  const { brand } = await params;
  const line = getLine(brand);
  if (!line) return { title: "Product line" };
  return {
    title: `${line.name} — ${line.tagline}`,
    description: `${line.name} (CSI ${line.csi}) — specs, models, and technical data, with an on-page catalog agent. ${line.tagline}`,
  };
}

export default async function ProductLinePage({
  params,
}: {
  params: Promise<{ category: string; brand: string }>;
}) {
  const { category, brand } = await params;
  const line = getLine(brand);
  if (!line || line.category !== category) notFound();

  return <ProductLineTemplate line={line} />;
}
