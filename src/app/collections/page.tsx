import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { JEWELRY_IMAGES, SHOP } from "@/lib/constants";
import { getImageUrl } from "@/lib/content/image";
import { getCollectionsData } from "@/lib/server-data";
import { ProductCatalog } from "@/components/products/ProductCatalog";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Tamil Jewellery Collections",
  description:
    "Shop bridal jewellery, thali, haram, jimikki, bangles and temple collections with live pricing.",
};

export default async function CollectionsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  const { q, category } = await searchParams;
  const { products, categories } = await getCollectionsData(q, category);
  const showcaseCollections = [
    {
      id: "c1",
      title: "Temple Jewelry",
      subtitle: "Lakshmi coins and heritage layers",
      image: JEWELRY_IMAGES.temple,
      href: "/collections/temple-jewelry",
    },
    {
      id: "c2",
      title: "Bridal Sets",
      subtitle: "Wedding-ready statement pieces",
      image: JEWELRY_IMAGES.wedding,
      href: "/collections/wedding-thali",
    },
    {
      id: "c3",
      title: "Pendants",
      subtitle: "Lotus and floral focal pieces",
      image: JEWELRY_IMAGES.heritage,
      href: "/collections/jaffna-heritage",
    },
    {
      id: "c4",
      title: "Daily Gold",
      subtitle: "Elegant everyday wear",
      image: JEWELRY_IMAGES.gold,
      href: "/collections/daily-gold",
    },
    {
      id: "c5",
      title: "Signature Necklaces",
      subtitle: "Bold bridal silhouettes",
      image: JEWELRY_IMAGES.bridalBanner,
      href: "/wedding",
    },
    {
      id: "c6",
      title: "Browse All",
      subtitle: "See the full jewellery range",
      image: JEWELRY_IMAGES.hero[0],
      href: "/products",
    },
  ];
  const heroImage = getImageUrl(showcaseCollections[0]?.image, 1200, 1600) || JEWELRY_IMAGES.bridalBanner;

  return (
    <>
      <PageHero
        title="Jewellery Collections"
        subtitle="Timeless elegance, inspired by heritage."
        image={heroImage}
      />

      <section className="mx-auto max-w-7xl px-4 pb-14 pt-10 md:px-8">
        <AnimatedSection>
          <SectionHeading
            title="Our Latest Collections"
            subtitle="Clear category cards, elegant imagery, and direct browsing like a premium jewellery showcase."
          />
        </AnimatedSection>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {showcaseCollections.map((collection, index) => (
            <AnimatedSection key={collection.id} delay={index * 0.08}>
              <Link
                href={collection.href}
                className="group relative block aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-gold/15 bg-[#f8f0e3] shadow-[0_24px_90px_rgba(122,84,40,0.12)]"
              >
                <Image
                  src={collection.image}
                  alt={collection.title}
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,250,242,0.04),rgba(255,250,242,0.18),rgba(86,41,27,0.72))]" />
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
                  <span className="inline-flex rounded-full border border-gold/25 bg-black/20 px-3 py-1 text-[11px] uppercase tracking-[0.35em] text-gold/80">
                    Collection
                  </span>
                  <h2 className="mt-4 font-serif text-2xl transition-colors group-hover:text-[#fff5cc] md:text-3xl">
                    {collection.title}
                  </h2>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#f6ebdd]">
                    {collection.subtitle}
                  </p>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="luxury-panel p-6 md:p-8">
            <p className="text-xs uppercase tracking-[0.35em] text-gold/70">Shop the look</p>
            <h3 className="heading-lg mt-3">Browse by style or go straight to the product list</h3>
            <p className="text-muted mt-3 text-sm leading-relaxed">
              Use the jewellery categories above for a quick visual browse, then refine the product catalog below by category.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={`https://wa.me/${SHOP.whatsapp}?text=${encodeURIComponent(`Hello ${SHOP.name}, I am interested in one of your jewellery collections.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold"
              >
                WhatsApp Inquiry
              </a>
              <Link href="/contact" className="btn-outline-gold">
                Contact Showroom
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {showcaseCollections.slice(0, 4).map((collection) => (
              <Link
                key={`${collection.id}-thumb`}
                href={collection.href}
                className="overflow-hidden rounded-[1.5rem] border border-gold/10 bg-[#f8f0e3]"
              >
                <div className="relative aspect-square">
                  <Image
                    src={collection.image}
                    alt={collection.title}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 50vw, 20vw"
                  />
                </div>
                <div className="p-4">
                  <p className="font-medium">{collection.title}</p>
                  <p className="mt-1 text-sm text-muted">{collection.subtitle}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <ProductCatalog products={products} title={"Shop Collections"} />
        </div>
      </section>
    </>
  );
}
