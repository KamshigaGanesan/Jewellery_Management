import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProductDetail } from "@/lib/server-data";
import { SHOP } from "@/lib/constants";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await getProductDetail(slug);
  if (!data) return { title: "Product Not Found" };
  return {
    title: data.product.name,
    description: data.product.description,
    openGraph: {
      title: data.product.name,
      description: data.product.description,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const data = await getProductDetail(slug);
  if (!data) notFound();
  const { product, related, reviews } = data;

  return (
    <section className="mx-auto max-w-7xl px-4 pb-14 pt-24 md:px-8 md:pt-28">
      <div className="luxury-panel p-5 md:p-8">
        <nav className="mb-6 text-sm text-muted">
          <Link href="/" className="hover:text-gold">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/collections" className="hover:text-gold">
            Collections
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[var(--color-text)]">{product.name}</span>
        </nav>
        <h1 className="heading-lg">{product.name}</h1>
        <p className="text-muted mt-2">{product.description}</p>
        <div className="mt-5 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
          <div className="luxury-card p-3">Purity: {product.goldPurity}</div>
          <div className="luxury-card p-3">Weight: {product.weightInGrams}g</div>
          <div className="luxury-card p-3">Making: {product.makingCharge}%</div>
          <div className="luxury-card p-3">Wastage: {product.wastagePercent}%</div>
        </div>
        <p className="mt-5 text-xl text-gold">Estimated Rs. {(product.displayPrice ?? product.estimatedPrice ?? 0).toLocaleString()}</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href={`https://wa.me/${SHOP.whatsapp}?text=${encodeURIComponent(`Hello ${SHOP.name}, I want details for ${product.name}.`)}`}
            className="btn-gold"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp Inquiry
          </a>
          <Link href="/appointment-booking" className="btn-outline-gold">
            Book Appointment
          </Link>
        </div>
      </div>
      <div className="mt-10 grid gap-4 lg:grid-cols-2">
        <div className="luxury-card p-5">
          <h2 className="text-xl font-semibold">Customer Reviews</h2>
          <div className="mt-3 space-y-3 text-sm">
            {reviews.map((review) => (
              <div key={String(review._id)} className="rounded-xl border border-gold/15 p-3">
                <p>{"★".repeat(review.rating)}</p>
                <p className="text-muted mt-1">{review.comment}</p>
              </div>
            ))}
            {reviews.length === 0 && <p className="text-muted">No reviews yet.</p>}
          </div>
        </div>
        <div className="luxury-card p-5">
          <h2 className="text-xl font-semibold">Related Jewellery</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {related.map((item) => (
              <Link key={String(item._id)} href={`/products/${item.slug}`} className="rounded-xl border border-gold/15 p-3">
                <p className="font-medium">{item.name}</p>
                <p className="mt-1 text-sm text-gold">Rs. {(item.displayPrice ?? item.estimatedPrice ?? 0).toLocaleString()}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
