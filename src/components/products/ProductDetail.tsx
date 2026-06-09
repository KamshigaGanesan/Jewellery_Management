"use client";

import Image from "next/image";
import { useState } from "react";
import { Heart, ZoomIn } from "lucide-react";
import type { Product } from "@/lib/content/types";
import { formatPrice, getCategoryLabel } from "@/lib/utils";
import { useWishlist } from "@/components/providers/WishlistProvider";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { motion, AnimatePresence } from "framer-motion";
import { JEWELRY_IMAGES } from "@/lib/constants";
import { getProductCategorySlug, getProductImageUrls } from "@/lib/commerce";

const FALLBACK_BY_CATEGORY: Record<string, string> = {
  bridal: JEWELRY_IMAGES.bridal,
  thali: JEWELRY_IMAGES.thali,
  haram: JEWELRY_IMAGES.gold,
  jimikki: JEWELRY_IMAGES.jimikki,
  bangles: JEWELRY_IMAGES.bangles,
  rings: JEWELRY_IMAGES.gold,
  temple: JEWELRY_IMAGES.temple,
  wedding: JEWELRY_IMAGES.wedding,
  diamond: JEWELRY_IMAGES.diamond,
  gold: JEWELRY_IMAGES.gold,
  antique: JEWELRY_IMAGES.temple,
  default: JEWELRY_IMAGES.default,
};

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [selectedImage, setSelectedImage] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);

  const productImages = getProductImageUrls(product);
  const images =
    productImages.length > 0
      ? productImages
      : [FALLBACK_BY_CATEGORY[getProductCategorySlug(product)] || FALLBACK_BY_CATEGORY.default];

  const inWishlist = isInWishlist(product._id);

  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
      <div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-gold/15 bg-[#130d0a]">
          <Image
            src={images[selectedImage]}
            alt={product.name}
            fill
            className="cursor-zoom-in object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
            onClick={() => setZoomOpen(true)}
            priority
          />
          <button
            type="button"
            onClick={() => setZoomOpen(true)}
            className="absolute bottom-4 right-4 rounded-full border border-gold/20 bg-black/30 p-2 backdrop-blur"
            aria-label="Zoom image"
          >
            <ZoomIn className="h-5 w-5 text-gold" />
          </button>
        </div>
        {images.length > 1 && (
          <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
            {images.map((img, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setSelectedImage(i)}
                className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border-2 ${
                  selectedImage === i ? "border-gold" : "border-[var(--color-border)]"
                }`}
              >
                <Image src={img} alt="" fill className="object-cover" sizes="80px" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div>
        <p className="text-[10px] uppercase tracking-[0.35em] text-gold/80">
          {getCategoryLabel(getProductCategorySlug(product))}
        </p>
        <h1 className="heading-lg mt-3 text-[#fff4da]">{product.name}</h1>
        <p className="mt-4 font-serif text-3xl text-gold">
          {formatPrice(product.displayPrice ?? product.price ?? product.estimatedPrice ?? 0)}
        </p>

        <div className="mt-6 grid grid-cols-2 gap-4 border-y border-[var(--color-border)] py-6">
          {product.goldType && (
            <div>
              <p className="text-xs uppercase text-[var(--color-text-muted)]">Gold Type</p>
              <p className="mt-1">{product.goldType}</p>
            </div>
          )}
          {product.weight && (
            <div>
              <p className="text-xs uppercase text-[var(--color-text-muted)]">Weight</p>
              <p className="mt-1">{product.weight}</p>
            </div>
          )}
          {product.weightInGrams ? (
            <div>
              <p className="text-xs uppercase text-[var(--color-text-muted)]">Weight</p>
              <p className="mt-1">{product.weightInGrams}g</p>
            </div>
          ) : null}
          <div>
            <p className="text-xs uppercase text-[var(--color-text-muted)]">Availability</p>
            <p className="mt-1">{product.available ?? product.isAvailable ? "In Stock" : "Sold Out"}</p>
          </div>
        </div>

        {product.description && (
          <p className="mt-6 leading-relaxed text-[var(--color-text-muted)]">{product.description}</p>
        )}

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <WhatsAppButton productName={product.name} />
          <button
            type="button"
            onClick={() => toggleWishlist(product._id)}
            className="btn-outline-gold flex items-center justify-center gap-2"
          >
            <Heart className={`h-5 w-5 ${inWishlist ? "fill-gold" : ""}`} />
            {inWishlist ? "In Wishlist" : "Add to Wishlist"}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {zoomOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--color-bg)]/95 p-4"
            onClick={() => setZoomOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="relative max-h-[90vh] max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
                <Image
                  src={images[selectedImage]}
                  alt={product.name}
                  width={1200}
                  height={1500}
                  className="max-h-[90vh] w-auto object-contain"
                />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
