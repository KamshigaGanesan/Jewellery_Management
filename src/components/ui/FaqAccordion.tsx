"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "Do you offer Mr. Rasaiya Thevendran's traditional bridal sets?",
    answer: "Yes, we specialize in authentic Sri Lankan Tamil bridal gold layers, including customized thali chains (Ponnurukal melting), temple neckpieces, jimikkis, harams, and traditional wedding ornaments handcrafted by our heritage goldsmiths.",
  },
  {
    question: "Is your gold quality hallmarked and certified?",
    answer: "Absolutely. All jewellery sold at Indiran Jewellers is strictly 916 22-Karat hallmarked, adhering to Sri Lanka's premium gold standards. We provide transparent certificates and weight evaluations for every piece.",
  },
  {
    question: "How are daily gold rates determined at the showroom?",
    answer: "Our showroom daily rates are updated directly on our system based on market fluctuations. We display live rates on our website so you can verify rates before scheduling your visit.",
  },
  {
    question: "Can I bring custom designs or photos from WhatsApp?",
    answer: "Yes, you can upload or message your custom jewellery designs to our WhatsApp support, and our designers will reply with estimates and detail specifications.",
  },
];

export function FaqAccordion() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-4">
      {FAQS.map((faq, index) => {
        const isOpen = activeIndex === index;
        return (
          <div
            key={index}
            className="overflow-hidden rounded-2xl border border-gold/12 bg-white/60 backdrop-blur-md transition-all duration-300 hover:border-gold/25"
          >
            <button
              onClick={() => toggle(index)}
              className="flex w-full items-center justify-between p-5 text-left font-serif text-lg text-[#2b1c15] transition-colors hover:text-gold"
            >
              <span>{faq.question}</span>
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-gold transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="border-t border-gold/10 p-5 pt-0 text-sm leading-relaxed text-[var(--color-text-muted)] bg-[#fffaf2]/30">
                    <p className="mt-3">{faq.answer}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
