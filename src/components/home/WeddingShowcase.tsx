import Image from "next/image";
import Link from "next/link";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { JEWELRY_IMAGES } from "@/lib/constants";

export function WeddingShowcase() {
  return (
    <section className="relative isolate min-h-[620px] overflow-hidden bg-[#f7efe4]">
      <Image
        src={JEWELRY_IMAGES.wedding}
        alt="Tamil bridal jewelry — thali and jimikki"
        fill
        className="object-cover object-center opacity-55"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(212,175,55,0.2),transparent_35%),linear-gradient(180deg,rgba(255,248,239,0.18),rgba(106,35,50,0.14))]" />
      <div className="relative z-10 mx-auto flex min-h-[620px] max-w-7xl items-center px-4 py-16 md:px-8 lg:px-12">
        <AnimatedSection>
          <div className="luxury-panel max-w-3xl p-8 text-left md:p-12">
            <p className="text-xs uppercase tracking-[0.45em] text-gold/80">
              Wedding Collection
            </p>
            <h2 className="heading-lg mt-5 max-w-2xl text-[#2b1c15]">
              Thali, Jimikki and Bridal Gold for the Tamil wedding ceremony
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-[var(--color-text-muted)]">
              A bridal story shaped by Jaffna gold traditions, temple motifs,
              and heirloom pieces that feel emotional, ceremonial, and regal.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/wedding" className="btn-gold">
                Explore Wedding Collection
              </Link>
              <Link href="/contact" className="btn-outline-gold">
                Book Bridal Guidance
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
