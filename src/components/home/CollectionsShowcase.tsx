import Image from "next/image";
import Link from "next/link";
import type { Collection } from "@/lib/content/types";
import { getImageUrl } from "@/lib/content/image";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { JEWELRY_IMAGES } from "@/lib/constants";

const COLLECTION_IMAGES: Record<string, string> = {
  "temple-jewelry": JEWELRY_IMAGES.temple,
  "wedding-thali": JEWELRY_IMAGES.wedding,
  "jaffna-heritage": JEWELRY_IMAGES.heritage,
  "daily-gold": JEWELRY_IMAGES.gold,
};

interface CollectionsShowcaseProps {
  collections: Collection[];
}

export function CollectionsShowcase({ collections }: CollectionsShowcaseProps) {
  const featured = collections.filter((c) => c.featured).slice(0, 4);

  return (
    <section className="section-padding section-ribbon bg-[#f5ebdc]">
      <div className="mx-auto max-w-7xl">
        <AnimatedSection>
          <SectionHeading
            title="Luxury Collections"
            subtitle="Temple, bridal, heritage, and daily gold collections with cinematic presentation"
          />
        </AnimatedSection>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {featured.map((collection, i) => {
            const slug = collection.slug.current;
            const img = collection.bannerImage
              ? getImageUrl(collection.bannerImage, 600, 800)
              : COLLECTION_IMAGES[slug] || JEWELRY_IMAGES.default;

            return (
              <AnimatedSection key={collection._id} delay={i * 0.1}>
                <Link
                  href={`/collections/${slug}`}
                  className="group relative block aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-gold/15 bg-[#f8f0e3] shadow-[0_24px_90px_rgba(122,84,40,0.12)]"
                >
                  <Image
                    src={img}
                    alt={collection.name}
                    fill
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,250,242,0.04),rgba(255,250,242,0.18),rgba(86,41,27,0.66))]" />
                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
                    <span className="inline-flex rounded-full border border-gold/25 bg-black/20 px-3 py-1 text-[11px] uppercase tracking-[0.35em] text-gold/80">
                      Collection
                    </span>
                    <h3 className="mt-4 font-serif text-2xl transition-colors group-hover:text-[#fff5cc] md:text-3xl">
                      {collection.name}
                    </h3>
                    {collection.description && (
                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#f6ebdd]">
                        {collection.description}
                      </p>
                    )}
                  </div>
                </Link>
              </AnimatedSection>
            );
          })}
        </div>
        <div className="mt-10 text-center">
          <Link href="/collections" className="btn-outline-gold">
            View All Collections
          </Link>
        </div>
      </div>
    </section>
  );
}
