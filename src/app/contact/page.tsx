import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { SHOP } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Visit ${SHOP.name} at ${SHOP.address}. Call ${SHOP.phone}.`,
};

export default async function ContactPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-14 pt-24 md:px-8 md:pt-28">
      <h1 className="heading-lg">Contact & Visit Showroom</h1>
      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <div className="luxury-card space-y-6 p-6">
          <p className="flex items-start gap-3"><MapPin className="h-5 w-5 text-gold" /> {SHOP.address}</p>
          <p className="flex items-center gap-3"><Phone className="h-5 w-5 text-gold" /> {SHOP.phone}</p>
          <p className="flex items-center gap-3"><Mail className="h-5 w-5 text-gold" /> {SHOP.email}</p>
          <p className="flex items-center gap-3"><Clock className="h-5 w-5 text-gold" /> {SHOP.workingHours}</p>
          <a className="btn-gold" href={`https://wa.me/${SHOP.whatsapp.replace(/\D/g, "")}`}>
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
    </section>
  );
}
