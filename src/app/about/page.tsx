import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/layout/PageHero";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { getAbout } from "@/lib/content/fetch";
import { JEWELRY_IMAGES, SHOP } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Us",
  description: `${SHOP.name} — Traditional Tamil gold jewelry in Chavakachcheri, Jaffna.`,
};

export default async function AboutPage() {
  const about = await getAbout();

  return (
    <>
      <PageHero title={about.title || "About Us"} subtitle={about.subtitle} />
      <section className="section-padding section-ribbon bg-[#0f0b09]">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
          <AnimatedSection>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] border border-gold/15">
              <Image
                src={JEWELRY_IMAGES.heritage}
                alt="Indiran Jewellers — Tamil gold jewelry"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <h2 className="font-serif text-2xl text-gold">Our Story</h2>
            <p className="mt-4 leading-relaxed text-[var(--color-text-muted)]">
              The shop started in 1941 by Mr. Rasaiya Thevendran, built on trust, traditional craftsmanship, and careful service for generations of families.
            </p>
            <p className="mt-4 leading-relaxed text-[var(--color-text-muted)]">{about.story}</p>
            <p className="mt-4 text-[var(--color-text-muted)]">{SHOP.address}</p>
            {about.yearsOfExperience && (
              <p className="mt-6 font-serif text-4xl text-gold">
                {about.yearsOfExperience}+ Years
              </p>
            )}
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding section-ribbon bg-[#120d0a]">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2">
          <AnimatedSection>
            <h2 className="font-serif text-2xl text-gold">Our Mission</h2>
            <p className="mt-4 text-[var(--color-text-muted)]">{about.mission}</p>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h2 className="font-serif text-2xl text-gold">Our Vision</h2>
            <p className="mt-4 text-[var(--color-text-muted)]">{about.vision}</p>
          </AnimatedSection>
        </div>
      </section>

      {about.values && about.values.length > 0 && (
        <section className="section-padding">
          <div className="mx-auto max-w-7xl text-center">
            <h2 className="heading-lg gold-text">Our Values</h2>
            <ul className="mt-10 flex flex-wrap justify-center gap-4">
              {about.values.map((value) => (
                <li
                  key={value}
                  className="rounded-full border border-gold/15 px-6 py-3 text-sm uppercase tracking-widest text-[var(--color-text)]"
                >
                  {value}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
