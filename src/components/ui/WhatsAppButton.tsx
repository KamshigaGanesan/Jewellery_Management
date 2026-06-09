"use client";

import { MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/utils";

interface WhatsAppButtonProps {
  productName?: string;
  className?: string;
  variant?: "primary" | "outline";
}

export function WhatsAppButton({
  productName,
  className = "",
  variant = "primary",
}: WhatsAppButtonProps) {
  const url = getWhatsAppUrl(productName || "Tamil jewellery enquiry");

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={
        variant === "primary"
          ? `btn-gold w-full sm:w-auto ${className}`
          : `btn-outline-gold w-full sm:w-auto ${className}`
      }
    >
      <MessageCircle className="h-5 w-5" />
      Order via WhatsApp
    </a>
  );
}
