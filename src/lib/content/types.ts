/** Image value from local data or an uploaded asset */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ImageSource = any;

export type Slug = { current: string };

export interface SiteSettings {
  shopName?: string;
  tagline?: string;
  phone?: string;
  email?: string;
  address?: string;
  instagramHandle?: string;
  instagramUrl?: string;
  facebookUrl?: string;
  youtubeUrl?: string;
  logo?: ImageSource;
}

export interface HeroBanner {
  _id: string;
  title: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
  image?: ImageSource;
  order?: number;
}

export interface Collection {
  _id: string;
  name: string;
  slug: Slug;
  description?: string;
  bannerImage?: ImageSource;
  featured?: boolean;
}

export type ProductCategory =
  | "gold"
  | "diamond"
  | "wedding"
  | "bridal"
  | "silver"
  | "antique"
  | "other";

export interface Product {
  _id: string;
  name: string;
  slug: Slug | string;
  category: ProductCategory | string | { slug?: string; name?: string };
  price?: number;
  displayPrice?: number;
  estimatedPrice?: number;
  goldType?: string;
  goldPurity?: string;
  weight?: string;
  weightInGrams?: number;
  makingCharge?: number;
  wastagePercent?: number;
  description?: string;
  images?: ImageSource[];
  media?: Array<{ url: string; type?: "image" | "video" }>;
  available?: boolean;
  isAvailable?: boolean;
  featured?: boolean;
  isFeatured?: boolean;
  isTrending?: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
}

export interface GoldPrice {
  _id: string;
  price22k: number;
  price24k: number;
  silver?: number;
  lastUpdated?: string;
  note?: string;
}

export interface Offer {
  _id: string;
  title: string;
  discount?: string;
  description?: string;
  expiryDate?: string;
  bannerImage?: ImageSource;
  active?: boolean;
}

export interface Testimonial {
  _id: string;
  customerName: string;
  review: string;
  rating: number;
  image?: ImageSource;
}

export interface GalleryImage {
  _id: string;
  title?: string;
  image?: ImageSource;
  category?: string;
  order?: number;
}

export interface AboutPage {
  title?: string;
  subtitle?: string;
  story?: string;
  mission?: string;
  vision?: string;
  values?: string[];
  heroImage?: ImageSource;
  teamImage?: ImageSource;
  yearsOfExperience?: number;
}

export interface ContactPage {
  title?: string;
  subtitle?: string;
  phone?: string;
  email?: string;
  address?: string;
  mapEmbedUrl?: string;
  workingHours?: string;
}
