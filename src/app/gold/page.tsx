import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { ProductCatalog } from "@/components/products/ProductCatalog";
import { getProductsByCategory } from "@/lib/content/fetch";

export const metadata: Metadata = {
  title: "Tamil Gold Jewelry",
  description:
    "Traditional Tamil gold — temple haram, kasu mala, bangles. Chavakachcheri, Jaffna.",
};

export default async function GoldPage() {
  const products = await getProductsByCategory("gold");

  return (
    <>
      <PageHero
        title="Tamil Gold Jewelry"
        subtitle="Temple haram, kasu mala, bangles & chains — 916 hallmarked gold"
      />
      <section className="section-padding">
        <div className="mx-auto max-w-7xl">
          <ProductCatalog
            products={products}
            defaultCategory="gold"
          />
        </div>
      </section>
    </>
  );
}
