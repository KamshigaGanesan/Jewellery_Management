import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Phone, MessageCircle } from "lucide-react";
import { SHOP } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Customer Inquiry",
  description: "Contact Indiran Jewellers, Chavakachcheri, Jaffna.",
};

export default function InquiryPage() {
  const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || SHOP.whatsapp}?text=${encodeURIComponent(`Hello ${SHOP.name}! I have an inquiry.`)}`;

  return (
    <>
      <PageHero
        title="Send an Inquiry"
        subtitle="We reply within 24 hours"
      />
      <section className="section-padding">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <AnimatedSection>
              <InquiryForm />
            </AnimatedSection>
          </div>
          <AnimatedSection delay={0.2}>
            <div className="luxury-card space-y-6 p-8">
              <h3 className="font-serif text-xl text-gold">Visit Our Shop</h3>
              <p className="text-sm text-muted">{SHOP.address}</p>
              <a
                href={`tel:${SHOP.phoneTel}`}
                className="flex items-center gap-3 hover:text-gold"
              >
                <Phone className="h-5 w-5 text-gold" />
                {SHOP.phone}
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold flex w-full justify-center"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
