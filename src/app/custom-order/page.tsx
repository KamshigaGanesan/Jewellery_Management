import Link from "next/link";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { SHOP } from "@/lib/constants";

export default function CustomOrderPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 pb-14 pt-24 md:pt-28">
      <div className="luxury-panel p-6 md:p-8">
        <p className="text-xs uppercase tracking-[0.35em] text-gold/70">WhatsApp Inquiry</p>
        <h1 className="heading-lg mt-2">Send your design request on WhatsApp</h1>
        <p className="text-muted mt-3 text-sm leading-7">
          Share a photo, your budget, or a short description. Our showroom team will reply directly on WhatsApp instead of using a separate form.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <WhatsAppButton />
          <Link href="/collections" className="btn-outline-gold">
            Browse Collections
          </Link>
        </div>
        <p className="mt-5 text-xs text-[var(--color-text-muted)]">
          WhatsApp number: {SHOP.whatsapp}
        </p>
      </div>
    </section>
  );
}
