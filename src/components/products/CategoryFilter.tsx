"use client";

import { cn } from "@/lib/utils";

const categories = [
  { key: "all", label: "All" },
  { key: "bridal", label: "Bridal" },
  { key: "thali", label: "Thali" },
  { key: "haram", label: "Haram" },
  { key: "jimikki", label: "Jimikki" },
  { key: "bangles", label: "Bangles" },
  { key: "rings", label: "Rings" },
  { key: "temple", label: "Temple Jewellery" },
  { key: "daily", label: "Daily Wear" },
];

interface CategoryFilterProps {
  active: string;
  onChange: (category: string) => void;
}

export function CategoryFilter({ active, onChange }: CategoryFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {categories.map((cat) => (
        <button
          key={cat.key}
          type="button"
          onClick={() => onChange(cat.key)}
          className={cn(
            "shrink-0 rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] transition-all",
            active === cat.key
              ? "border-gold bg-gold text-charcoal-dark shadow-[0_10px_24px_rgba(190,145,63,0.28)]"
              : "border-[var(--color-border)] bg-[rgba(255,255,255,0.03)] text-[var(--color-text-muted)] hover:border-gold/60 hover:bg-gold/10 hover:text-gold"
          )}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
