import Link from "next/link";
import type { Metadata } from "next";
import { requireAdmin } from "@/lib/api-auth";
import { CollectionCreateForm } from "@/components/owner/CollectionCreateForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Add Collection",
  description: "Simple owner page for uploading jewellery collections.",
};

export default async function AddCollectionPage() {
  const auth = await requireAdmin();

  if (auth.error || !auth.user) {
    return (
      <section className="mx-auto max-w-3xl px-4 pb-14 pt-24 md:px-8 md:pt-28">
        <div className="luxury-card p-6 md:p-8">
          <p className="text-xs uppercase tracking-[0.35em] text-gold/70">Owner Access</p>
          <h1 className="heading-lg mt-3">Add Collection</h1>
          <p className="text-muted mt-3 text-sm">Sign in to upload a new jewellery piece.</p>
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
        <h1 className="heading-lg mt-3">Add Collection</h1>
        <p className="text-muted mt-3 max-w-2xl text-sm">
          Upload one image, name the piece, choose a category, and publish it straight into the site.
        </p>
        <div className="mt-6">
          <CollectionCreateForm />
        </div>
      </div>
    </section>
  );
}