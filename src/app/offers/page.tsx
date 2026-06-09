import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { getOffers } from "@/lib/content/fetch";
import { getImageUrl } from "@/lib/content/image";
import { JEWELRY_IMAGES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Special Offers",
  description: "Exclusive offers on gold, diamond, and wedding jewelry.",
};

export default async function OffersPage() {
  const offers = await getOffers();

  return (
    <>
      <PageHero title="Special Offers" subtitle="Exclusive deals on our finest collections" />
      <section className="section-padding section-ribbon bg-[#0f0b09]">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 lg:grid-cols-3">
          {offers.map((offer, i) => (
            <AnimatedSection key={offer._id} delay={i * 0.1}>
              <article className="luxury-card overflow-hidden">
                <div className="relative aspect-[16/9] bg-[#130d0a]">
                  <Image
                    src={
                      offer.bannerImage
                        ? getImageUrl(offer.bannerImage, 600, 340)
                        : JEWELRY_IMAGES.bridalBanner
                    }
                    alt={offer.title}
                    fill
                    className="object-cover object-center"
                    sizes="400px"
                  />
                  {offer.discount && (
                    <span className="absolute right-4 top-4 rounded-full bg-gold px-3 py-1 text-sm font-bold uppercase text-charcoal-dark shadow-lg shadow-gold/15">
                      {offer.discount}
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <h2 className="font-serif text-xl text-[#fff4da]">{offer.title}</h2>
                  {offer.description && (
                    <p className="mt-2 text-sm text-[var(--color-text-muted)]">{offer.description}</p>
                  )}
                  {offer.expiryDate && (
                    <p className="mt-4 text-xs text-[var(--color-text-muted)]">
                      Valid until: {new Date(offer.expiryDate).toLocaleDateString("en-IN")}
                    </p>
                  )}
                  <Link href="/contact" className="btn-outline-gold mt-6 inline-flex text-xs">
                    Visit Store
                  </Link>
                </div>
              </article>
            </AnimatedSection>
          ))}
        </div>
      </section>
    </>
  );
}
