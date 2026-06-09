import type { Product } from "@/lib/content/types";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  emptyMessage?: string;
}

export function ProductGrid({
  products,
  emptyMessage = "No products found.",
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <p className="py-16 text-center text-[var(--color-text-muted)]">{emptyMessage}</p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
      {products.map((product, index) => (
        <div key={product._id} className="flex">
          <ProductCard product={product} index={index} />
        </div>
      ))}
    </div>
  );
}
