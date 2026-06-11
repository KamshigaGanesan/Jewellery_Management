import Link from "next/link";
import type { Metadata } from "next";
import { requireAdmin } from "@/lib/api-auth";
import { GoldRateUpdateForm } from "@/components/owner/GoldRateUpdateForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Update Gold Rate",
  description: "Simple owner page for updating daily gold and silver rates.",
};

export default async function UpdateGoldRatePage() {
  const auth = await requireAdmin();

  if (auth.error || !auth.user) {
    return (
      <section className="mx-auto max-w-3xl px-4 pb-14 pt-24 md:px-8 md:pt-28">
        <div className="luxury-card p-6 md:p-8">
          <p className="text-xs uppercase tracking-[0.35em] text-gold/70">Owner Access</p>
          <h1 className="heading-lg mt-3">Update Gold Rate</h1>
          <p className="text-muted mt-3 text-sm">Sign in to change the daily 22K, 24K, and silver rates.</p>
          <Link href="/admin/login" className="btn-gold mt-6 inline-flex">
            Owner Login
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-4xl px-4 pb-14 pt-24 md:px-8 md:pt-28">
      <div className="luxury-card p-6 md:p-8">
        <p className="text-xs uppercase tracking-[0.35em] text-gold/70">Owner Management</p>
        <h1 className="heading-lg mt-3">Update Gold Rate</h1>
        <p className="text-muted mt-3 max-w-2xl text-sm">
          Enter today&apos;s rates once. The homepage and gold rate page refresh automatically.
        </p>
        <div className="mt-6">
          <GoldRateUpdateForm />
        </div>
      </div>
    </section>
  );
}