"use client";

import { MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/utils";

export function FloatingWhatsApp() {
  const url = getWhatsAppUrl("General showroom enquiry");

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 bg-[#0c2817]/90 text-gold shadow-lg backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:scale-105 hover:bg-[#0c2817]"
      aria-label="Contact on WhatsApp"
    >
      <span className="absolute inset-0 rounded-full bg-gold/15 animate-ping opacity-70" />
      <MessageCircle className="relative z-10 h-6 w-6" />
    </a>
  );
}
