import Link from "next/link";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export function CTABanner() {
  return (
    <section className="section-padding section-ribbon bg-[#f7efe4]">
      <AnimatedSection>
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-gold/20 bg-[linear-gradient(135deg,rgba(255,250,243,0.95),rgba(241,228,208,0.9))] p-10 text-center md:p-16">
          <div className="absolute inset-0 shimmer-line opacity-20" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.15),transparent_35%)]" />
          <div className="relative z-10">
            <p className="text-xs uppercase tracking-[0.45em] text-gold/70">Showroom Experience</p>
            <h2 className="heading-lg mt-4 text-[#2b1c15]">
              Visit the Indiran showroom in Chavakachcheri
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-[var(--color-text-muted)]">
              Step into a Tamil luxury jewelry destination with bridal guidance,
              temple heritage pieces, and personalized service.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/contact" className="btn-gold">
                Get Directions
              </Link>
              <Link href="/inquiry" className="btn-outline-gold">
                Send Inquiry
              </Link>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}
