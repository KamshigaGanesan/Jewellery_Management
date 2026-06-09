"use client";

import { Star } from "lucide-react";
import { motion } from "framer-motion";
import type { Testimonial } from "@/lib/content/types";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export function TestimonialsSection({
  testimonials,
}: TestimonialsSectionProps) {
  return (
    <section className="section-padding section-ribbon bg-[#f8f0e3]">
      <div className="mx-auto max-w-7xl">
        <AnimatedSection>
          <SectionHeading
            title="Loved by Families"
            subtitle="Emotional, ceremonial, and trusted jewelry stories from our customers"
          />
        </AnimatedSection>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={t._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="luxury-card p-6"
            >
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    className={`h-4 w-4 ${
                      j < t.rating
                        ? "fill-gold text-gold"
                        : "text-white/20"
                    }`}
                  />
                ))}
              </div>
              <p className="mt-5 text-sm leading-relaxed text-[var(--color-text-muted)]">
                &ldquo;{t.review}&rdquo;
              </p>
              <footer className="mt-4 font-serif text-gold">
                — {t.customerName}
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
