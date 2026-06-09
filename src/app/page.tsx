import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/content/types";
import { getHomeData } from "@/lib/server-data";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { JEWELRY_IMAGES, SHOP } from "@/lib/constants";
import { ProductGrid } from "@/components/products/ProductGrid";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { featured, latestRates } = await getHomeData();
  const featuredProducts = featured.map((product) => ({
    ...product,
    slug: typeof product.slug === "string" ? product.slug : product.slug?.current ?? String(product._id),
  })) as Product[];
  const testimonials = [
    {
      name: "Kavitha Selvarajah",
      text: "Clear pricing, beautiful finish, and very helpful service.",
    },
    {
      name: "Suthan Family",
      text: "Our thali and jimikki were made exactly how we wanted.",
    },
    {
      name: "Tharshika Rajan",
      text: "Quick WhatsApp reply and trustworthy showroom service.",
    },
  ];

  return (
    <div className="pb-14 pt-20 md:pt-24">
      <section className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid gap-8 overflow-hidden rounded-[2.25rem] border border-gold/12 bg-[linear-gradient(180deg,rgba(255,250,242,0.92),rgba(247,239,228,0.82))] p-5 shadow-[0_24px_90px_rgba(122,84,40,0.08)] md:grid-cols-[0.85fr_1.15fr] md:p-8 lg:min-h-[76vh] lg:items-center">
          <div className="space-y-4 lg:pr-4">
            <p className="text-xs uppercase tracking-[0.45em] text-gold/75">Indiran Jewellers · Chavakachcheri</p>
            <h1 className="max-w-xl font-serif text-3xl leading-tight text-[#2b1c15] md:text-4xl lg:text-5xl">
              Sri Lankan Tamil jewellery for bridal and everyday wear.
            </h1>
            <p className="max-w-xl text-sm leading-7 text-[var(--color-text-muted)] md:text-[15px]">
              Bridal gold, thali, haram, jimikki, and daily wear selected for families in Jaffna.
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <Link href="/collections" className="btn-gold shadow-[0_12px_30px_rgba(212,175,55,0.18)]">
                Browse Collections
              </Link>
              <a
                href={`https://wa.me/${SHOP.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(`Hello ${SHOP.name}, I would like to inquire about your jewellery collections.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-gold bg-white/55"
              >
                WhatsApp Inquiry
              </a>
            </div>
            <div className="flex flex-wrap gap-2 pt-3 text-[11px] uppercase tracking-[0.3em] text-[#7c6251]">
              <span className="rounded-full border border-gold/15 bg-white/60 px-3.5 py-2">Bridal Gold</span>
              <span className="rounded-full border border-gold/15 bg-white/60 px-3.5 py-2">Temple Jewellery</span>
              <span className="rounded-full border border-gold/15 bg-white/60 px-3.5 py-2">Jaffna Heritage</span>
            </div>
          </div>

          <div className="relative min-h-[460px] overflow-hidden rounded-[2rem] bg-[#1b100c] md:min-h-[660px]">
            <Image
              src={JEWELRY_IMAGES.hero[0]}
              alt="Tamil bride wearing traditional gold jewellery"
              fill
              priority
              className="object-cover brightness-110 contrast-110 saturate-110 transition-transform duration-700 hover:scale-[1.02]"
              style={{ objectPosition: "center 16%" }}
              sizes="(max-width: 768px) 100vw, 52vw"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,12,8,0.25),rgba(20,12,8,0.02)_35%,rgba(20,12,8,0.14)),linear-gradient(180deg,rgba(20,12,8,0.02),rgba(20,12,8,0.3))]" />
            <div className="absolute bottom-5 left-5 right-5 rounded-[1.5rem] border border-white/14 bg-black/28 p-4 text-white backdrop-blur-md md:bottom-6 md:left-6 md:right-6 md:p-5">
              <p className="text-[10px] uppercase tracking-[0.35em] text-gold/80">Showroom Highlight</p>
              <p className="mt-2 text-sm leading-6 text-white/86">
                Fine bridal layers, temple detail, and trusted daily gold pieces.
              </p>
            </div>
            <div className="absolute left-5 top-5 rounded-full border border-white/14 bg-white/14 px-4 py-2 text-[10px] uppercase tracking-[0.35em] text-white/90 backdrop-blur-md animate-float-slow">
              Premium bridal mood
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-7xl px-4 md:px-8">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-gold/70">Featured Collections</p>
            <h2 className="mt-2 font-serif text-3xl text-[#2b1c15] md:text-4xl">Actual products from the showroom</h2>
          </div>
          <Link href="/collections" className="hidden text-sm text-gold md:inline-flex">
            View all
          </Link>
        </div>
        <ProductGrid products={featuredProducts.slice(0, 4)} emptyMessage="No featured products available yet." />
      </section>

      <section className="mx-auto mt-12 max-w-7xl px-4 md:px-8">
        <div className="grid gap-4 rounded-[2rem] border border-gold/12 bg-[#f7efe4] p-5 md:grid-cols-4 md:p-8">
          <div className="md:col-span-4">
            <p className="text-xs uppercase tracking-[0.35em] text-gold/70">Gold Rate</p>
            <h2 className="mt-2 font-serif text-3xl text-[#2b1c15]">Daily live rates</h2>
          </div>
          <div className="rounded-[1.5rem] border border-gold/15 bg-white/75 p-5 shadow-[0_14px_30px_rgba(122,84,40,0.06)]">
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-text-muted)]">22K Gold Rate / gram</p>
            <p className="mt-3 font-serif text-3xl text-gold">Rs. {latestRates?.gold22k?.toLocaleString("en-LK") ?? "-"}</p>
          </div>
          <div className="rounded-[1.5rem] border border-gold/15 bg-white/75 p-5 shadow-[0_14px_30px_rgba(122,84,40,0.06)]">
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-text-muted)]">24K Gold Rate / gram</p>
            <p className="mt-3 font-serif text-3xl text-gold">Rs. {latestRates?.gold24k?.toLocaleString("en-LK") ?? "-"}</p>
          </div>
          <div className="rounded-[1.5rem] border border-gold/15 bg-white/75 p-5 shadow-[0_14px_30px_rgba(122,84,40,0.06)]">
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-text-muted)]">Silver Rate / gram</p>
            <p className="mt-3 font-serif text-3xl text-gold">Rs. {latestRates?.silver?.toLocaleString("en-LK") ?? "-"}</p>
          </div>
          <div className="rounded-[1.5rem] border border-gold/15 bg-white/75 p-5 shadow-[0_14px_30px_rgba(122,84,40,0.06)] md:col-span-4">
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-text-muted)]">Last updated</p>
            <p className="mt-2 text-sm text-[var(--color-text)]">{latestRates?.recordedOn ? formatDate(latestRates.recordedOn) : "Pending update"}</p>
            <div className="mt-4">
              <Link href="/gold-price" className="btn-outline-gold">
                View Gold Rate Page
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-7xl px-4 md:px-8">
        <div className="grid gap-6 rounded-[2rem] border border-gold/12 bg-[linear-gradient(180deg,rgba(255,250,242,0.94),rgba(248,240,227,0.78))] p-6 md:grid-cols-[1fr_auto] md:items-center md:p-8">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-gold/70">WhatsApp Inquiry</p>
            <h2 className="mt-2 font-serif text-3xl text-[#2b1c15]">Send a photo or ask for the exact piece on WhatsApp</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--color-text-muted)]">
              Share your design idea, bridal need, or collection interest and our showroom team will reply directly.
            </p>
          </div>
          <a
            href={`https://wa.me/${SHOP.whatsapp}?text=${encodeURIComponent(`Hello ${SHOP.name}, I would like details about a jewellery piece from your collections.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold justify-self-start"
          >
            WhatsApp Message
          </a>
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-7xl px-4 md:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {testimonials.map((item) => (
            <div key={item.name} className="luxury-card p-6">
              <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">&ldquo;{item.text}&rdquo;</p>
              <p className="mt-4 text-xs uppercase tracking-[0.28em] text-gold">{item.name}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-7xl px-4 md:px-8">
        <div className="grid gap-4 rounded-[2rem] border border-gold/12 bg-[#f8f0e3] p-6 md:grid-cols-[1.1fr_0.9fr] md:p-8">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-gold/70">WhatsApp Contact</p>
            <h2 className="mt-2 font-serif text-3xl text-[#2b1c15]">Talk to the showroom team</h2>
            <p className="mt-3 text-sm leading-7 text-[var(--color-text-muted)]">
              Ask for price, availability, or a bridal consultation.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <WhatsAppButton />
              <Link href="/contact" className="btn-outline-gold">
                Contact Page
              </Link>
            </div>
          </div>
          <div className="luxury-card p-6">
            <p className="text-xs uppercase tracking-[0.35em] text-gold/70">Store Location</p>
            <h3 className="mt-2 font-serif text-2xl text-[#2b1c15]">Chavakachcheri, Jaffna</h3>
            <p className="mt-3 text-sm leading-7 text-[var(--color-text-muted)]">{SHOP.address}</p>
            <p className="mt-3 text-sm text-[var(--color-text-muted)]">{SHOP.workingHours}</p>
            <p className="mt-2 text-sm text-[var(--color-text-muted)]">Phone: {SHOP.phone}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
