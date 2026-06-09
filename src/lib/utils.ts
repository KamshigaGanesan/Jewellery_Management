import type { ProductCategory } from "./content/types";
import { SHOP } from "./constants";

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-LK", {
    style: "currency",
    currency: "LKR",
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en-LK", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}

export function getWhatsAppUrl(
  productName: string,
  phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || SHOP.whatsapp
): string {
  const message = encodeURIComponent(
    `Hello ${SHOP.name}! I'm interested in: ${productName}. Please share more details.`
  );
  return `https://wa.me/${phone}?text=${message}`;
}

export function getCategoryLabel(category: ProductCategory | string): string {
  const labels: Record<string, string> = {
    gold: "Tamil Gold",
    diamond: "Diamond",
    wedding: "Wedding / Thali",
    bridal: "Bridal Set",
    thali: "Thali",
    haram: "Haram",
    jimikki: "Jimikki",
    bangles: "Bangles",
    rings: "Rings",
    temple: "Temple Jewellery",
    silver: "Silver",
    antique: "Temple Antique",
    other: "Other",
  };
  return labels[category] || category;
}

export function cn(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
