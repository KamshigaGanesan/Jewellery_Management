import Link from "next/link";
import { TrendingUp } from "lucide-react";
import type { GoldPrice } from "@/lib/content/types";
import { formatDate } from "@/lib/utils";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

interface GoldPriceWidgetProps {
  goldPrice: GoldPrice | null;
}

export function GoldPriceWidget({ goldPrice }: GoldPriceWidgetProps) {
  if (!goldPrice) return null;

  return (
    <section className="section-padding section-ribbon bg-[#f7efe4]">
      <AnimatedSection>
        <div className="mx-auto max-w-6xl">
          <div className="luxury-panel grid gap-5 p-6 md:grid-cols-[1.2fr_0.9fr_0.9fr_auto] md:items-center md:gap-4 md:p-8">
            <div className="flex items-center gap-4">
              <div className="rounded-full border border-gold/30 bg-gold/10 p-4 text-gold">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-serif text-2xl text-[#2b1c15]">Today&apos;s Gold Rate</h3>
                <p className="mt-1 text-sm text-[var(--color-text-muted)]">Updated daily for the Jaffna showroom</p>
                {goldPrice.lastUpdated && (
                  <p className="mt-2 text-xs uppercase tracking-[0.3em] text-gold/70">
                    {formatDate(goldPrice.lastUpdated)}
                  </p>
                )}
              </div>
            </div>
            <div className="rounded-2xl border border-gold/15 bg-white/70 p-5 text-center">
              <p className="text-xs uppercase tracking-[0.4em] text-[var(--color-text-muted)]">22K / 8g</p>
              <p className="mt-3 font-serif text-3xl text-gold">
                Rs. {goldPrice.price22k.toLocaleString("en-LK")}
              </p>
            </div>
            <div className="rounded-2xl border border-gold/15 bg-white/70 p-5 text-center">
              <p className="text-xs uppercase tracking-[0.4em] text-[var(--color-text-muted)]">24K / 8g</p>
              <p className="mt-3 font-serif text-3xl text-gold">
                Rs. {goldPrice.price24k.toLocaleString("en-LK")}
              </p>
            </div>
            <Link href="/gold-price" className="btn-outline-gold justify-self-start md:justify-self-end">
              Full Rates
            </Link>
          </div>
          {goldPrice.note && (
            <p className="mt-4 text-center text-xs tracking-wide text-[var(--color-text-muted)]">
              {goldPrice.note}
            </p>
          )}
        </div>
      </AnimatedSection>
    </section>
  );
}
