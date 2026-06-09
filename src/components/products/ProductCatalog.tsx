"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/content/types";
import { ProductGrid } from "./ProductGrid";
import { ProductSearch } from "./ProductSearch";
import { CategoryFilter } from "./CategoryFilter";
import { getProductCategorySlug } from "@/lib/commerce";

interface ProductCatalogProps {
  products: Product[];
  defaultCategory?: string;
  title?: string;
}

export function ProductCatalog({
  products,
  defaultCategory = "all",
  title,
}: ProductCatalogProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(defaultCategory);
  const [sort, setSort] = useState("newest");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const cat = category.toLowerCase();

    const base = products.filter((p) => {
      const name = p.name?.toLowerCase() ?? "";
      const desc = p.description?.toLowerCase() ?? "";
      const matchesSearch = !q || name.includes(q) || desc.includes(q);

      const productCat = getProductCategorySlug(p).toLowerCase();
      const matchesCategory =
        cat === "all" ||
        productCat.includes(cat) ||
        name.includes(cat) ||
        desc.includes(cat);

      return matchesSearch && matchesCategory;
    });

    if (sort === "priceAsc") {
      base.sort((a, b) => (a.displayPrice ?? a.estimatedPrice ?? 0) - (b.displayPrice ?? b.estimatedPrice ?? 0));
    } else if (sort === "priceDesc") {
      base.sort((a, b) => (b.displayPrice ?? b.estimatedPrice ?? 0) - (a.displayPrice ?? a.estimatedPrice ?? 0));
    } else {
      base.sort((a, b) => (new Date(b.createdAt || 0).getTime() || 0) - (new Date(a.createdAt || 0).getTime() || 0));
    }

    return base;
  }, [products, search, category, sort]);

  return (
    <div>
      {title ? <h1 className="heading-lg mb-6 gold-text">{title}</h1> : null}

      <div className="mb-6 rounded-[1.75rem] border border-gold/10 bg-[linear-gradient(180deg,rgba(255,250,242,0.92),rgba(248,240,227,0.82))] p-4 shadow-[0_20px_70px_rgba(122,84,40,0.08)] md:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex-1 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-gold/70">Catalogue Controls</p>
                <p className="mt-1 text-sm text-[var(--color-text-muted)]">Search, filter, and sort the showroom catalogue.</p>
              </div>
              <p className="rounded-full border border-gold/15 bg-white/70 px-3 py-1 text-sm font-medium text-[var(--color-text)]">
                Showing {filtered.length} products
              </p>
            </div>

            <div className="grid gap-3 lg:grid-cols-[1.3fr_0.7fr]">
              <ProductSearch value={search} onChange={setSearch} />
              <label className="flex items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-white/70 px-4 py-3 text-sm text-[var(--color-text-muted)]">
                Sort
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="w-full bg-transparent text-sm text-[var(--color-text)] outline-none"
                >
                  <option value="newest">Newest</option>
                  <option value="priceAsc">Price: Low → High</option>
                  <option value="priceDesc">Price: High → Low</option>
                </select>
              </label>
            </div>
          </div>
        </div>

        <div className="mt-4 border-t border-gold/10 pt-4">
          <CategoryFilter active={category} onChange={setCategory} />
        </div>
      </div>

      <ProductGrid
        products={filtered}
        emptyMessage="No jewellery matched your selected collection or search."
      />
    </div>
  );
}
