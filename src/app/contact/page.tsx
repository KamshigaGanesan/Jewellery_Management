import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { SHOP } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Visit ${SHOP.name} at ${SHOP.address}. Call ${SHOP.phone}.`,
};

export default async function ContactPage() {
  const whatsappNumber = SHOP.whatsapp.replace(/\D/g, "");
  const customOrderMessage = encodeURIComponent(
    `Hello ${SHOP.name}, I would like to place a custom jewellery order. I can share a photo, size, budget, and design details.`
  );

  return (
    <section className="mx-auto max-w-7xl px-4 pb-14 pt-24 md:px-8 md:pt-28">
      <h1 className="heading-lg">Contact & Visit Showroom</h1>
      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <div className="luxury-card space-y-6 p-6">
          <p className="flex items-start gap-3"><MapPin className="h-5 w-5 text-gold" /> {SHOP.address}</p>
          <p className="flex items-center gap-3"><Phone className="h-5 w-5 text-gold" /> {SHOP.phone}</p>
          <p className="flex items-center gap-3"><Mail className="h-5 w-5 text-gold" /> {SHOP.email}</p>
          <p className="flex items-center gap-3"><Clock className="h-5 w-5 text-gold" /> {SHOP.workingHours}</p>
          <a className="btn-gold" href={`https://wa.me/${whatsappNumber}`}>
            <MessageCircle className="h-4 w-4" /> WhatsApp Chat
          </a>
        </div>
        <div className="aspect-video overflow-hidden rounded-[1.75rem] border border-gold/15 bg-elevated">
          <iframe
            title="Indiran Jewellers — Chavakachcheri, Jaffna"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3152!2d80.162!3d9.667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwNDAnMDAuMCJOIDgwwJowwJcyMC4wIkU!5e0!3m2!1sen!2slk!4v1"
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: 400 }}
            loading="lazy"
          />
        </div>
      </div>

      <div className="mt-6 rounded-[2rem] border border-gold/12 bg-[linear-gradient(180deg,rgba(255,250,242,0.94),rgba(248,240,227,0.78))] p-6 md:p-8">
        <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-gold/70">Custom Order</p>
            <h2 className="mt-2 font-serif text-3xl text-[#2b1c15]">Order your design through WhatsApp</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--color-text-muted)]">
              Send a jewellery photo, preferred weight, size, budget, or bridal set idea. Our showroom team will reply on WhatsApp with guidance, price details, and the next steps.
            </p>
          </div>
          <a
            className="btn-gold justify-self-start"
            href={`https://wa.me/${whatsappNumber}?text=${customOrderMessage}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle className="h-4 w-4" /> Custom Order via WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
