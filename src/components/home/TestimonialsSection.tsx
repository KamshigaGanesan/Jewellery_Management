"use client";

import { Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import type { Testimonial } from "@/lib/content/types";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export function TestimonialsSection({
  testimonials,
}: TestimonialsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  if (testimonials.length === 0) return null;

  return (
    <section className="section-padding section-ribbon bg-[#f8f0e3]">
      <div className="mx-auto max-w-4xl text-center">
        <AnimatedSection>
          <SectionHeading
            title="Loved by Families"
            subtitle="Emotional, ceremonial, and trusted jewelry stories from our customers"
          />
        </AnimatedSection>
        
        <div className="relative mt-12 min-h-[220px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={testimonials[currentIndex]._id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="px-4"
            >
              <div className="flex justify-center gap-1 mb-5">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    className={`h-4.5 w-4.5 ${
                      j < testimonials[currentIndex].rating
                        ? "fill-gold text-gold"
                        : "text-gold/20"
                    }`}
                  />
                ))}
              </div>
              <p className="font-serif text-lg leading-relaxed text-[#4e3629] md:text-xl max-w-3xl mx-auto">
                &ldquo;{testimonials[currentIndex].review}&rdquo;
              </p>
              <footer className="mt-6 text-xs uppercase tracking-[0.3em] text-gold font-medium">
                — {testimonials[currentIndex].customerName}
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                i === currentIndex ? "w-6 bg-gold" : "w-1.5 bg-gold/30 hover:bg-gold/50"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

