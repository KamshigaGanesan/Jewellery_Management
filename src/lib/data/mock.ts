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
} from "../content/types";
import { JEWELRY_IMAGES, SHOP } from "../constants";

export const siteSettings: SiteSettings = {
  shopName: SHOP.name,
  tagline: SHOP.tagline,
  phone: SHOP.phone,
  email: SHOP.email,
  address: SHOP.address,
  instagramHandle: "@indiranjewellers",
  instagramUrl: "https://instagram.com/indiranjewellers",
};

export const heroBanners: HeroBanner[] = [
  {
    _id: "hero-1",
    title: "Traditional Tamil Gold Jewelry",
    subtitle: "Temple gold, thali and bridal sets in Chavakachcheri, Jaffna",
    buttonText: "View Collections",
    buttonLink: "/collections",
    image: JEWELRY_IMAGES.hero[0],
    order: 1,
  },
  {
    _id: "hero-2",
    title: "Wedding & Bridal Collection",
    subtitle: "Thali, jimikki and haram crafted for Jaffna families",
    buttonText: "Wedding Collection",
    buttonLink: "/wedding",
    image: JEWELRY_IMAGES.bridalBanner,
    order: 2,
  },
];

export const collections: Collection[] = [
  {
    _id: "col-1",
    name: "Temple Necklace",
    slug: { current: "temple-jewelry" },
    description: "Layered Lakshmi coin necklace with traditional temple detailing",
    bannerImage: JEWELRY_IMAGES.temple,
    featured: true,
  },
  {
    _id: "col-2",
    name: "Bridal Necklace Set",
    slug: { current: "wedding-thali" },
    description: "Matching bridal necklace and earrings for wedding occasions",
    bannerImage: JEWELRY_IMAGES.wedding,
    featured: true,
  },
  {
    _id: "col-3",
    name: "Lotus Pendant",
    slug: { current: "jaffna-heritage" },
    description: "Lotus motif pendant with pearl drops and heritage finish",
    bannerImage: JEWELRY_IMAGES.heritage,
    featured: true,
  },
  {
    _id: "col-4",
    name: "Gold Ring",
    slug: { current: "daily-gold" },
    description: "Elegant daily-wear gold ring with leaf motif styling",
    bannerImage: JEWELRY_IMAGES.gold,
    featured: true,
  },
];

export const products: Product[] = [
  {
    _id: "p1",
    name: "Temple Lakshmi Kasu Mala",
    slug: { current: "temple-lakshmi-kasu-mala" },
    category: "gold",
    price: 485000,
    goldType: "22K",
    weight: "52g",
    description:
      "Traditional Tamil temple kasu mala with Lakshmi coin motifs, worn for festivals and family functions in Jaffna tradition.",
    images: [JEWELRY_IMAGES.temple],
    available: true,
    featured: true,
    isBestSeller: true,
    isNew: false,
  },
  {
    _id: "p2",
    name: "Bridal Thali Chain Set",
    slug: { current: "bridal-thali-chain-set" },
    category: "wedding",
    price: 125000,
    goldType: "22K",
    weight: "8g",
    description:
      "Sacred thali kodi with matching chain, essential Tamil wedding jewelry crafted for Jaffna brides.",
    images: [JEWELRY_IMAGES.bridalBanner],
    available: true,
    featured: true,
    isBestSeller: true,
    isNew: true,
  },
  {
    _id: "p3",
    name: "Long Temple Haram",
    slug: { current: "long-temple-haram" },
    category: "gold",
    price: 650000,
    goldType: "22K",
    weight: "95g",
    description:
      "Grand South Indian style haram with temple bell and mango motifs for temple visits and weddings.",
    images: [JEWELRY_IMAGES.heritage],
    available: true,
    featured: true,
    isBestSeller: false,
    isNew: false,
  },
  {
    _id: "p4",
    name: "Jimikki & Mattal Set",
    slug: { current: "jimikki-mattal-set" },
    category: "wedding",
    price: 185000,
    goldType: "22K",
    weight: "14g",
    description: "Classic dangling jimikki earrings with mattal chain, a beloved Tamil bridal accessory.",
    images: [JEWELRY_IMAGES.wedding],
    available: true,
    featured: false,
    isBestSeller: true,
    isNew: true,
  },
  {
    _id: "p5",
    name: "Traditional Kada Bangles (4)",
    slug: { current: "traditional-kada-bangles" },
    category: "gold",
    price: 220000,
    goldType: "22K",
    weight: "32g",
    description: "Handcrafted kada bangles with Tamil floral engraving for daily and festive wear.",
    images: [JEWELRY_IMAGES.heritage],
    available: true,
    featured: false,
    isBestSeller: true,
    isNew: false,
  },
  {
    _id: "p6",
    name: "Mango Mala Bridal Set",
    slug: { current: "mango-mala-bridal-set" },
    category: "wedding",
    price: 420000,
    goldType: "22K",
    weight: "68g",
    description:
      "Mango motif necklace with matching earrings and nethi chutti, a complete Tamil bridal set.",
    images: [JEWELRY_IMAGES.wedding],
    available: true,
    featured: true,
    isBestSeller: false,
    isNew: true,
  },
  {
    _id: "p7",
    name: "Antique Temple Vaddanam",
    slug: { current: "antique-temple-vaddanam" },
    category: "antique",
    price: 380000,
    goldType: "22K",
    weight: "45g",
    description: "Waist belt with temple figures for Bharatanatyam and traditional ceremonies.",
    images: [JEWELRY_IMAGES.temple],
    available: true,
    featured: false,
    isBestSeller: false,
    isNew: false,
  },
  {
    _id: "p8",
    name: "Diamond Gold Ring",
    slug: { current: "diamond-gold-ring" },
    category: "diamond",
    price: 295000,
    goldType: "18K",
    weight: "6g",
    description: "Featured diamond ring in warm gold for engagement, gifting and occasion styling.",
    images: [JEWELRY_IMAGES.diamond],
    available: true,
    featured: true,
    isBestSeller: false,
    isNew: true,
  },
];

export const goldPrice: GoldPrice = {
  _id: "gold-1",
  price22k: 360000,
  price24k: 391000,
  lastUpdated: new Date().toISOString(),
  note: "Prices per sovereign (8g) in Sri Lankan Rupees (LKR). Updated daily at our Chavakachcheri showroom.",
};

export const offers: Offer[] = [
  {
    _id: "offer-1",
    title: "Wedding Season Offer",
    discount: "10% OFF",
    description: "On all bridal thali and wedding sets",
    bannerImage: JEWELRY_IMAGES.bridalBanner,
    expiryDate: "2026-12-31",
    active: true,
  },
  {
    _id: "offer-2",
    title: "Temple Jewelry Offer",
    discount: "Making FREE",
    description: "On temple haram above Rs. 500,000",
    bannerImage: JEWELRY_IMAGES.temple,
    expiryDate: "2026-08-31",
    active: true,
  },
  {
    _id: "offer-3",
    title: "Gold Exchange",
    discount: "Best Rate",
    description: "Exchange old gold for new Tamil designs",
    bannerImage: JEWELRY_IMAGES.heritage,
    expiryDate: "2026-06-30",
    active: true,
  },
];

export const testimonials: Testimonial[] = [
  {
    _id: "t1",
    customerName: "Kayalvizhi & Nanthan",
    review:
      "Our wedding thali and jimikki from Indiran Jewellers were beautiful. True Jaffna craftsmanship!",
    rating: 5,
  },
  {
    _id: "t2",
    customerName: "Sundari Amma",
    review: "I buy all my temple jewelry here in New Market. Honest gold quality and fair price.",
    rating: 5,
  },
  {
    _id: "t3",
    customerName: "Ravi Kumar",
    review: "Excellent service for our family pooja. Kasu mala and bangles were perfect.",
    rating: 5,
  },
  {
    _id: "t4",
    customerName: "Malathi",
    review: "They helped us choose a traditional bridal set. Very patient and knowledgeable staff.",
    rating: 5,
  },
];

export const gallery: GalleryImage[] = [
  { _id: "g1", title: "Temple Necklace", image: JEWELRY_IMAGES.temple, category: "bridal", order: 1 },
  { _id: "g2", title: "Gold Ring", image: JEWELRY_IMAGES.gold, category: "gold", order: 2 },
  { _id: "g3", title: "Bridal Necklace Set", image: JEWELRY_IMAGES.wedding, category: "gold", order: 3 },
  { _id: "g4", title: "Lotus Pendant", image: JEWELRY_IMAGES.heritage, category: "gold", order: 4 },
  { _id: "g5", title: "Tamil Bride", image: JEWELRY_IMAGES.hero[0], category: "wedding", order: 5 },
  { _id: "g6", title: "Diamond Gold Ring", image: JEWELRY_IMAGES.diamond, category: "diamond", order: 6 },
];

export const aboutPage: AboutPage = {
  title: "Our Story",
  subtitle: "Indiran Jewellers, trusted in Chavakachcheri, Jaffna",
  story:
    "Indiran Jewellers has served families across Jaffna with authentic Tamil gold jewelry from our shop at No 10, New Market, Chavakachcheri. We specialize in temple jewelry, thali chains, jimikki, kasu mala, and traditional bridal sets.",
  mission:
    "To provide every Tamil family with sacred, beautiful jewelry that honours our traditions, from daily wear to wedding thali.",
  vision: "To be Jaffna's most trusted name for traditional Tamil gold jewelry.",
  values: [
    "916 Hallmarked Gold",
    "Traditional Tamil Designs",
    "Transparent Pricing",
    "Jaffna Heritage Craft",
    "Family Trust",
  ],
  heroImage: JEWELRY_IMAGES.heritage,
  teamImage: JEWELRY_IMAGES.bridalBanner,
  yearsOfExperience: 25,
};

export const contactPage: ContactPage = {
  title: "Visit Our Shop",
  subtitle: "New Market, Chavakachcheri",
  phone: SHOP.phone,
  email: SHOP.email,
  address: SHOP.address,
  workingHours: SHOP.workingHours,
};
