import { JEWELRY_IMAGES } from "./constants";

export const ADMIN_COOKIE_NAME = "indiran-admin-session";
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "owner@indiranjewellers.lk";
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "Indiran2026!";

export type AdminHeroBanner = {
  id: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  imageUrl: string;
};

export type AdminCollection = {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  featured: boolean;
};

export type AdminProduct = {
  id: string;
  name: string;
  category: string;
  price: number;
  imageUrl: string;
  featured: boolean;
};

export type AdminOffer = {
  id: string;
  title: string;
  discount: string;
  description: string;
  active: boolean;
};

export type AdminState = {
  heroBanners: AdminHeroBanner[];
  collections: AdminCollection[];
  products: AdminProduct[];
  offers: AdminOffer[];
  goldPrice: {
    price22k: number;
    price24k: number;
    note: string;
  };
};

export const defaultAdminState: AdminState = {
  heroBanners: [
    {
      id: "hero-1",
      title: "Timeless Tamil Elegance",
      subtitle: "Crafted for generations in the heart of Jaffna.",
      buttonText: "Explore Collections",
      buttonLink: "/collections",
      imageUrl: JEWELRY_IMAGES.hero[0],
    },
    {
      id: "hero-2",
      title: "Temple, Bridal, Heritage",
      subtitle: "A luxury Tamil jewelry story with ceremonial depth.",
      buttonText: "View Wedding Jewelry",
      buttonLink: "/wedding",
      imageUrl: JEWELRY_IMAGES.bridalBanner,
    },
  ],
  collections: [
    {
      id: "collection-1",
      name: "Temple Jewelry",
      slug: "temple-jewelry",
      description: "Lakshmi motifs, kasu mala, and antique temple silhouettes.",
      imageUrl: JEWELRY_IMAGES.temple,
      featured: true,
    },
    {
      id: "collection-2",
      name: "Bridal Collection",
      slug: "wedding-thali",
      description: "Thali, jimikki, and wedding heirlooms for Tamil brides.",
      imageUrl: JEWELRY_IMAGES.wedding,
      featured: true,
    },
  ],
  products: [
    {
      id: "product-1",
      name: "Temple Lakshmi Kasu Mala",
      category: "gold",
      price: 485000,
      imageUrl: JEWELRY_IMAGES.temple,
      featured: true,
    },
    {
      id: "product-2",
      name: "Bridal Thali Chain Set",
      category: "wedding",
      price: 125000,
      imageUrl: JEWELRY_IMAGES.bridalBanner,
      featured: true,
    },
  ],
  offers: [
    {
      id: "offer-1",
      title: "Wedding Season Offer",
      discount: "10% OFF",
      description: "On bridal thali and wedding sets.",
      active: true,
    },
  ],
  goldPrice: {
    price22k: 360000,
    price24k: 391000,
    note: "Draft rates shown in the owner panel.",
  },
};
