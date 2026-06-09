import { SHOP } from "@/lib/constants";
import { getImageUrl } from "@/lib/content/image";

export type GoldRateType = "22K" | "24K" | "Silver";

export const GOLD_RATE_TYPES: GoldRateType[] = ["22K", "24K", "Silver"];

export type ProductLike = {
  _id: string;
  slug?: string | { current?: string };
  name: string;
  category?: string | { slug?: string; name?: string };
  goldPurity?: string;
  goldType?: string;
  weightInGrams?: number;
  makingCharge?: number;
  wastagePercent?: number;
  estimatedPrice?: number;
  displayPrice?: number;
  isAvailable?: boolean;
  available?: boolean;
  isTrending?: boolean;
  isFeatured?: boolean;
  isNew?: boolean;
  stock?: number;
  media?: Array<{ url: string; type?: "image" | "video" }>;
  images?: Array<{ url?: string } | string>;
  imageUrl?: string;
  description?: string;
};

export type GoldRateRecord = {
  _id: string;
  type: GoldRateType;
  pricePerGram: number;
  recordedOn: string;
  updatedBy?: string;
  previousPricePerGram?: number | null;
  changeDirection?: "up" | "down" | "same";
  updatedAt?: string;
};

export type GoldRateSummary = {
  recordedOn: string | null;
  updatedAt: string | null;
  updatedBy: string | null;
  gold22k: number | null;
  gold24k: number | null;
  silver: number | null;
  change22k: number;
  change24k: number;
  changeSilver: number;
  history: GoldRateRecord[];
};

export function getProductSlug(product: ProductLike): string {
  if (typeof product.slug === "string") return product.slug;
  return product.slug?.current || String(product._id);
}

export function getProductCategorySlug(product: ProductLike): string {
  if (typeof product.category === "string") return product.category;
  return product.category?.slug || product.category?.name || "other";
}

export function getProductPrimaryImage(product: ProductLike): string | null {
  const mediaImage = product.media?.find((item) => item.type !== "video")?.url;
  if (mediaImage) return mediaImage;

  if (product.imageUrl) return product.imageUrl;

  const image = product.images?.[0];
  if (!image) return null;
  return getImageUrl(image, 900, 1125);
}

export function getProductImageUrls(product: ProductLike): string[] {
  const mediaImages = product.media
    ?.filter((item) => item.type !== "video" && item.url)
    .map((item) => item.url) ?? [];
  if (mediaImages.length > 0) return mediaImages;

  if (product.images && product.images.length > 0) {
    return product.images.map((image) => getImageUrl(image, 1200, 1500));
  }

  return product.imageUrl ? [product.imageUrl] : [];
}

export function getGoldRateValue(
  rates: GoldRateSummary | null | undefined,
  type: GoldRateType,
): number | null {
  if (!rates) return null;
  const value = type === "22K" ? rates.gold22k : type === "24K" ? rates.gold24k : rates.silver;
  return typeof value === "number" ? value : null;
}

export function calculateEstimatedPrice(
  product: Pick<ProductLike, "goldPurity" | "weightInGrams" | "makingCharge" | "wastagePercent" | "estimatedPrice">,
  rates?: GoldRateSummary | null,
): number {
  const weight = product.weightInGrams || 0;
  const purity = (product.goldPurity || "22K") as GoldRateType;
  const rate = getGoldRateValue(rates, purity) ?? product.estimatedPrice ?? 0;
  const base = rate * weight;
  const making = base * ((product.makingCharge || 0) / 100);
  const wastage = base * ((product.wastagePercent || 0) / 100);
  return Math.round(base + making + wastage);
}

export function summarizeGoldRates(records: GoldRateRecord[]): GoldRateSummary {
  const latestByType = new Map<GoldRateType, GoldRateRecord>();
  const previousByType = new Map<GoldRateType, GoldRateRecord>();

  for (const record of records) {
    const current = latestByType.get(record.type);
    if (!current) {
      latestByType.set(record.type, record);
      continue;
    }
    if (new Date(record.recordedOn).getTime() > new Date(current.recordedOn).getTime()) {
      previousByType.set(record.type, current);
      latestByType.set(record.type, record);
    } else if (!previousByType.has(record.type)) {
      previousByType.set(record.type, record);
    }
  }

  const latest = latestByType.get("22K") || latestByType.get("24K") || latestByType.get("Silver") || null;
  const gold22k = latestByType.get("22K")?.pricePerGram ?? null;
  const gold24k = latestByType.get("24K")?.pricePerGram ?? null;
  const silver = latestByType.get("Silver")?.pricePerGram ?? null;

  const changeFor = (type: GoldRateType) => {
    const current = latestByType.get(type)?.pricePerGram;
    const previous = previousByType.get(type)?.pricePerGram;
    if (typeof current !== "number" || typeof previous !== "number") return 0;
    return current - previous;
  };

  return {
    recordedOn: latest?.recordedOn ?? null,
    updatedAt: latest?.updatedAt ?? null,
    updatedBy: latest?.updatedBy ?? null,
    gold22k,
    gold24k,
    silver,
    change22k: changeFor("22K"),
    change24k: changeFor("24K"),
    changeSilver: changeFor("Silver"),
    history: records,
  };
}

export function getWhatsAppInquiryMessage(productName?: string, context?: string) {
  const parts = [
    `Hello ${SHOP.name}, I would like more details`,
    productName ? `for ${productName}` : null,
    context || null,
  ].filter(Boolean);
  return encodeURIComponent(`${parts.join(" ")}.`);
}
