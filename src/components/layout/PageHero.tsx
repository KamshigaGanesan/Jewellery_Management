import Image from "next/image";
import { JEWELRY_IMAGES } from "@/lib/constants";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  image?: string;
}

export function PageHero({ title, subtitle, image = JEWELRY_IMAGES.bridalBanner }: PageHeroProps) {
  return (
    <section className="section-ribbon relative flex min-h-[44vh] items-center justify-center overflow-hidden bg-[#0d0a09] pt-24">
      <Image
        src={image}
        alt={title}
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,10,9,0.58),rgba(13,10,9,0.82))]" />
      <div className="relative z-10 px-4 py-16 text-center">
        <p className="text-xs uppercase tracking-[0.45em] text-gold/70">Tamil Luxury Brand</p>
        <h1 className="heading-lg mt-4 gold-text">{title}</h1>
        {subtitle && (
          <p className="mx-auto mt-5 max-w-2xl text-[var(--color-text-muted)]">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
