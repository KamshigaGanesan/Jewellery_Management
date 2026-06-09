import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { ProductCatalog } from "@/components/products/ProductCatalog";
import { getProductsByCategory } from "@/lib/content/fetch";

export const metadata: Metadata = {
  title: "Diamond Jewelry",
  description: "Certified diamond rings, earrings, and pendants at Indiran Jewellers.",
};

export default async function DiamondPage() {
  const products = await getProductsByCategory("diamond");

  return (
    <>
      <PageHero
        title="Diamond Jewelry"
        subtitle="Certified diamonds in timeless settings"
      />
      <section className="section-padding">
        <div className="mx-auto max-w-7xl">
          <ProductCatalog
            products={products}
            defaultCategory="diamond"
          />
        </div>
      </section>
    </>
  );
}
