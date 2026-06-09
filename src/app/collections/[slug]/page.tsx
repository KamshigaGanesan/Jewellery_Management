import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { ProductCatalog } from "@/components/products/ProductCatalog";
import { getImageUrl } from "@/lib/content/image";
import { getCollectionBySlug, getProducts } from "@/lib/content/fetch";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const collection = await getCollectionBySlug(slug);
  if (!collection) return { title: "Collection Not Found" };
  return {
    title: collection.name,
    description: collection.description,
  };
}

export default async function CollectionDetailPage({ params }: Props) {
  const { slug } = await params;
  const collection = await getCollectionBySlug(slug);
  if (!collection) notFound();

  const allProducts = await getProducts();

  return (
    <>
      <PageHero
        title={collection.name}
        subtitle={collection.description}
        image={getImageUrl(collection.bannerImage)}
      />
      <section className="section-padding pt-8">
        <div className="mx-auto max-w-7xl">
          <ProductCatalog products={allProducts} />
        </div>
      </section>
    </>
  );
}
