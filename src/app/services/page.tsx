import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, Car, CircleDollarSign, Flame, Gem, Handshake, Landmark, PenLine, ScrollText, Sparkles, Wrench } from "lucide-react";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { JEWELRY_IMAGES, SHOP } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Signature Services",
  description:
    "Trusted jewellery services, custom design, repairs, engraving, facilities, and forex support.",
};

const services = [
  {
    title: "Forex",
    text: "Reliable foreign exchange support including buying and selling foreign currencies and issuing foreign drafts, with competitive rates, secure transactions, and friendly service.",
    icon: CircleDollarSign,
  },
  {
    title: "Polished & Professional",
    text: "Hand and machine engraving services for names, dates, messages, and meaningful details that turn jewellery into timeless keepsakes.",
    icon: PenLine,
  },
  {
    title: "Jewelry Repair & Restoration",
    text: "Ring resizing, clasp replacement, redesigning, remodelling, polishing, and careful repair work handled by skilled craftsmen.",
    icon: Wrench,
  },
  {
    title: "Corporate Jewellery",
    text: "Refined cufflinks, brooches, lapel pins, necklaces, and bracelets made with brand colours, subtle logos, or symbolic motifs for recognition and pride.",
    icon: Handshake,
  },
  {
    title: "Custom Jewellery Design",
    text: "One-of-a-kind jewellery tailored to your vision, crafted with care, precision, and artistry from idea to final piece.",
    icon: Sparkles,
  },
  {
    title: "Handwriting Jewellery",
    text: "Send a photograph of a treasured note or card and we can engrave the actual handwriting onto a necklace, bracelet, or chosen custom piece.",
    icon: ScrollText,
  },
  {
    title: "Gold Melting & Thali Making",
    text: "Gold melting (Ponnurukal) and custom Thali-making for Hindu weddings, created with purity, precision, and spiritual significance.",
    icon: Flame,
  },
  {
    title: "Gold Rate Guidance",
    text: "Clear daily rate support before choosing weight, purity, making charges, and final estimate.",
    icon: BadgeCheck,
  },
];


const steps = ["Share your need", "Choose service or design", "Confirm estimate", "Collect from showroom"];

export default function ServicesPage() {
  return (
    <div className="pb-14 pt-20 md:pt-24">
      <section className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid overflow-hidden rounded-[2rem] border border-gold/12 bg-[#fffaf2] shadow-[0_24px_90px_rgba(122,84,40,0.08)] lg:grid-cols-[0.92fr_1.08fr]">
          <div className="p-6 md:p-10 lg:p-12">
            <p className="text-xs uppercase tracking-[0.38em] text-gold/75">
              Indiran Jewellers Services
            </p>
            <h1 className="mt-4 max-w-xl font-serif text-4xl leading-tight text-[#2b1c15] md:text-5xl">
              Our services offer a complete experience
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--color-text-muted)] md:text-[15px]">
              We offer trusted services that combine craftsmanship, care, and convenience, delivering a complete experience from start to finish.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <WhatsAppButton />
              <Link href="/collections" className="btn-outline-gold bg-white/60">
                Browse Collections
              </Link>
            </div>
          </div>

          <div className="relative min-h-[360px] bg-[#1b100c] lg:min-h-[520px]">
            <Image
              src={JEWELRY_IMAGES.bridalBanner}
              alt="Tamil bridal jewellery service"
              fill
              priority
              className="object-cover brightness-105 saturate-110"
              sizes="(max-width: 1024px) 100vw, 52vw"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(24,13,8,0.08),rgba(24,13,8,0.3)),linear-gradient(180deg,rgba(24,13,8,0),rgba(24,13,8,0.42))]" />
          </div>
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-7xl px-4 md:px-8">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <article
                key={service.title}
                className="rounded-[1.5rem] border border-gold/12 bg-white/72 p-6 shadow-[0_14px_35px_rgba(122,84,40,0.06)]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gold/12 text-gold">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="mt-5 font-serif text-2xl leading-tight text-[#2b1c15]">
                  {service.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-[var(--color-text-muted)]">
                  {service.text}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      

      <section className="mx-auto mt-12 max-w-7xl px-4 md:px-8">
        <div className="grid gap-8 rounded-[2rem] border border-gold/12 bg-[#f7efe4] p-6 md:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-gold/70">
              Service Flow
            </p>
            <h2 className="mt-2 font-serif text-3xl text-[#2b1c15] md:text-4xl">
              Simple showroom process
            </h2>
            <p className="mt-3 text-sm leading-7 text-[var(--color-text-muted)]">
              Message us first or visit directly at {SHOP.address}. We will guide the jewellery choice and final estimate step by step.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {steps.map((step, index) => (
              <div key={step} className="rounded-2xl border border-gold/14 bg-white/72 p-5">
                <p className="font-serif text-3xl text-gold">{String(index + 1).padStart(2, "0")}</p>
                <p className="mt-2 text-sm font-semibold text-[#2b1c15]">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
