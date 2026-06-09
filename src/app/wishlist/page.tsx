"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useWishlist } from "@/components/providers/WishlistProvider";
import { ProductGrid } from "@/components/products/ProductGrid";
import { PageHero } from "@/components/layout/PageHero";
import { useEffect, useState } from "react";
import type { Product } from "@/lib/content/types";

export default function WishlistPage() {
  const { wishlist } = useWishlist();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (wishlist.length === 0) {
      setProducts([]);
      setLoading(false);
      return;
    }
    const wishlistSet = new Set(wishlist.map((id) => String(id)));

    fetch("/api/products")
      .then((r) => r.json())
      .then((payload: { products?: Product[] } | Product[]) => {
        const allProducts = Array.isArray(payload) ? payload : payload.products ?? [];
        setProducts(
          allProducts.filter((p) => {
            const productId = String(p._id);
            const productSlug = typeof p.slug === "string" ? p.slug : p.slug?.current;
            return wishlistSet.has(productId) || (productSlug ? wishlistSet.has(productSlug) : false);
          })
        );
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [wishlist]);

  return (
    <>
      <PageHero
        title="My Wishlist"
        subtitle="Your saved favorite pieces"
      />
      <section className="section-padding">
        <div className="mx-auto max-w-7xl">
          {loading ? (
            <p className="py-16 text-center text-white/60">Loading...</p>
          ) : products.length === 0 ? (
            <div className="py-16 text-center">
              <Heart className="mx-auto h-16 w-16 text-white/20" />
              <p className="mt-4 text-white/60">Your wishlist is empty</p>
              <Link href="/collections" className="btn-gold mt-6 inline-flex">
                Browse Collections
              </Link>
            </div>
          ) : (
            <ProductGrid products={products} />
          )}
        </div>
      </section>
    </>
  );
}
