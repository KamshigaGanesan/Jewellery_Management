import Link from "next/link";
import type { Product } from "@/lib/content/types";
import { ProductGrid } from "@/components/products/ProductGrid";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface ProductShowcaseProps {
  title: string;
  subtitle?: string;
  products: Product[];
  viewAllHref: string;
}

export function ProductShowcase({
  title,
  subtitle,
  products,
  viewAllHref,
}: ProductShowcaseProps) {
  if (products.length === 0) return null;

  return (
    <section className="section-padding section-ribbon bg-[#f8f0e3]">
      <div className="mx-auto max-w-7xl">
        <AnimatedSection>
          <SectionHeading title={title} subtitle={subtitle} />
        </AnimatedSection>
        <ProductGrid products={products.slice(0, 4)} />
        <div className="mt-10 text-center">
          <Link href={viewAllHref} className="btn-outline-gold">
            View All
          </Link>
        </div>
      </div>
    </section>
  );
}
