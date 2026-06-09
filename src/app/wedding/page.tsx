import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/layout/PageHero";
import { ProductCatalog } from "@/components/products/ProductCatalog";
import { getProductsByCategory } from "@/lib/content/fetch";
import { JEWELRY_IMAGES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Wedding & Thali Collection",
  description:
    "Tamil bridal jewelry — thali, jimikki, mango mala & wedding sets. Jaffna.",
};

export default async function WeddingPage() {
  const products = await getProductsByCategory("wedding");

  return (
    <>
      <PageHero
        title="Wedding & Thali"
        subtitle="Thali, jimikki & traditional bridal gold for your special day"
        image={JEWELRY_IMAGES.bridalBanner}
      />
      <section className="relative h-64 overflow-hidden md:h-96">
        <Image
          src={JEWELRY_IMAGES.bridalBanner}
          alt="Tamil bridal gold jewelry"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "var(--color-hero-overlay)" }}
        />
      </section>
      <section className="section-padding">
        <div className="mx-auto max-w-7xl">
          <ProductCatalog
            products={products}
            defaultCategory="wedding"
            title="Bridal & Wedding Jewelry"
          />
        </div>
      </section>
    </>
  );
}
