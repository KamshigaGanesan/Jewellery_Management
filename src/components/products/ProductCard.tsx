"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import type { Product } from "@/lib/content/types";
import { formatPrice } from "@/lib/utils";
import { useWishlist } from "@/components/providers/WishlistProvider";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { JEWELRY_IMAGES } from "@/lib/constants";
import { getProductCategorySlug, getProductPrimaryImage, getProductSlug } from "@/lib/commerce";

const FALLBACK_IMAGES: Record<string, string> = {
  bridal: JEWELRY_IMAGES.bridal,
  thali: JEWELRY_IMAGES.thali,
  haram: JEWELRY_IMAGES.gold,
  jimikki: JEWELRY_IMAGES.jimikki,
  bangles: JEWELRY_IMAGES.bangles,
  rings: JEWELRY_IMAGES.gold,
  temple: JEWELRY_IMAGES.temple,
  diamond: JEWELRY_IMAGES.diamond,
  wedding: JEWELRY_IMAGES.wedding,
  gold: JEWELRY_IMAGES.gold,
  antique: JEWELRY_IMAGES.temple,
  silver: JEWELRY_IMAGES.thali,
  default: JEWELRY_IMAGES.default,
};

function getProductImage(product: Product): string {
  const image = getProductPrimaryImage(product);
  if (image) {
    return image;
  }
  return FALLBACK_IMAGES[getProductCategorySlug(product)] || FALLBACK_IMAGES.default;
}

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const inWishlist = isInWishlist(product._id);
  const imageUrl = getProductImage(product);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      className="group luxury-card flex flex-col overflow-hidden border border-gold/12 bg-[linear-gradient(180deg,rgba(255,250,242,0.95),rgba(245,236,221,0.84))] shadow-[0_18px_55px_rgba(122,84,40,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(122,84,40,0.14)]"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-[#140f0b]">
        <Link href={`/products/${getProductSlug(product)}`}>
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        </Link>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,10,8,0.02),rgba(15,10,8,0.36))]" />
        {!product.available && (
          <span className="absolute left-3 top-3 rounded-full border border-gold/30 bg-black/50 px-2.5 py-1 text-xs uppercase tracking-wider text-[#fff4da] backdrop-blur">
            Sold Out
          </span>
        )}
        {product.isNew && (
          <span className="absolute right-3 top-3 rounded-full bg-gold px-2.5 py-1 text-xs font-medium uppercase tracking-wider text-charcoal-dark shadow-lg shadow-gold/15">
            New
          </span>
        )}
        <button
          type="button"
          onClick={() => toggleWishlist(product._id)}
          className="absolute bottom-3 right-3 rounded-full border border-gold/20 bg-black/30 p-2.5 backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-gold hover:text-charcoal-dark"
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className={`h-5 w-5 ${inWishlist ? "fill-gold text-gold" : ""}`}
          />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <p className="text-[10px] uppercase tracking-[0.35em] text-gold/80">
          {product.goldType || getProductCategorySlug(product)}
        </p>
        <Link href={`/products/${getProductSlug(product)}`}>
          <h3 className="mt-2 font-serif text-lg transition-colors group-hover:text-gold md:text-xl">
            {product.name}
          </h3>
        </Link>
        {product.weight && (
          <p className="mt-2 text-xs text-[var(--color-text-muted)]">Weight: {product.weight}</p>
        )}
        {product.weightInGrams ? (
          <p className="mt-2 text-xs text-[var(--color-text-muted)]">Weight: {product.weightInGrams}g</p>
        ) : null}
        <p className="mt-3 text-lg font-medium text-gold">
          {formatPrice(product.displayPrice ?? product.price ?? product.estimatedPrice ?? 0)}
        </p>

        <div className="mt-4 flex w-full items-center gap-3 text-sm">
          <div className="flex-1">
            <WhatsAppButton productName={product.name} className="w-full" variant="outline" />
          </div>
          <button
            type="button"
            onClick={() => toggleWishlist(product._id)}
            className="rounded-full border border-gold/20 bg-black/30 p-2 text-[var(--color-text)] transition-all hover:-translate-y-0.5 hover:bg-gold hover:text-charcoal-dark"
            aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={`h-5 w-5 ${inWishlist ? "fill-gold text-gold" : ""}`} />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
