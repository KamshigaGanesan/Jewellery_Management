import Link from "next/link";
import { requireAdmin } from "@/lib/api-auth";
import { GoldRateManager } from "@/components/admin/GoldRateManager";

export const dynamic = "force-dynamic";

export default async function AdminGoldRatesPage() {
  const auth = await requireAdmin();

  if (auth.error || !auth.user) {
    return (
      <section className="mx-auto max-w-3xl px-4 pb-14 pt-24 md:px-8 md:pt-28">
        <div className="luxury-card p-6 md:p-8">
          <p className="text-xs uppercase tracking-[0.35em] text-gold/70">Owner Access</p>
          <h1 className="heading-lg mt-3">Daily Gold Rate Update</h1>
          <p className="text-muted mt-3 text-sm">
            Please login as owner to update today&apos;s 22K, 24K, and silver rates.
          </p>
          <Link href="/admin/login" className="btn-gold mt-6 inline-flex">
            Owner Login
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-4 pb-14 pt-24 md:px-8 md:pt-28">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-gold/70">Owner Panel</p>
          <h1 className="heading-lg mt-2">Update Daily Gold Rate</h1>
        </div>
        <Link href="/gold-price" className="btn-outline-gold">
          View Public Rate Page
        </Link>
      </div>

      <GoldRateManager />
    </section>
  );
}
