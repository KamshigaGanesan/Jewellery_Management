import type {
  AboutPage,
  Collection,
  ContactPage,
  GalleryImage,
  GoldPrice,
  HeroBanner,
  Offer,
  Product,
  SiteSettings,
  Testimonial,
} from "./types";
import * as mock from "../data/mock";

function resolveSlug(slug: string | { current?: string } | undefined): string {
  if (!slug) return "";
  return typeof slug === "string" ? slug : slug.current || "";
}

export async function getSiteSettings(): Promise<SiteSettings> {
  return mock.siteSettings;
}

export async function getHeroBanners(): Promise<HeroBanner[]> {
  return mock.heroBanners;
}

export async function getCollections(): Promise<Collection[]> {
  return mock.collections;
}

export async function getCollectionBySlug(
  slug: string
): Promise<Collection | null> {
  return mock.collections.find((c) => resolveSlug(c.slug) === slug) ?? null;
}

export async function getProducts(): Promise<Product[]> {
  return mock.products;
}

export async function getProductsByCategory(
  category: string
): Promise<Product[]> {
  return mock.products.filter((p) => p.category === category);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return mock.products.find((p) => resolveSlug(p.slug) === slug) ?? null;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  return mock.products.filter((p) => p.featured);
}

export async function getBestSellers(): Promise<Product[]> {
  return mock.products.filter((p) => p.isBestSeller);
}

export async function getNewArrivals(): Promise<Product[]> {
  return mock.products.filter((p) => p.isNew);
}

export async function getSimilarProducts(
  category: string,
  slug: string
): Promise<Product[]> {
  return mock.products
    .filter((p) => p.category === category && resolveSlug(p.slug) !== slug)
    .slice(0, 4);
}

export async function getGoldPrice(): Promise<GoldPrice | null> {
  return mock.goldPrice;
}

export async function getOffers(): Promise<Offer[]> {
  return mock.offers;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return mock.testimonials;
}

export async function getGallery(): Promise<GalleryImage[]> {
  return mock.gallery;
}

export async function getAbout(): Promise<AboutPage> {
  return mock.aboutPage;
}

export async function getContact(): Promise<ContactPage> {
  return mock.contactPage;
}
