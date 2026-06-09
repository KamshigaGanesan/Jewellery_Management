"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Plus, Save, LogOut, Sparkles } from "lucide-react";
import { JEWELRY_IMAGES } from "@/lib/constants";
import type {
  AdminState,
  AdminHeroBanner,
  AdminCollection,
  AdminProduct,
  AdminOffer,
} from "@/lib/admin-state";

interface AdminDashboardProps {
  initialState: AdminState;
}

function fieldClassName() {
  return "w-full rounded-2xl border border-gold/18 bg-white/80 px-4 py-3 text-sm text-[#2b1c15] outline-none transition-colors placeholder:text-[#8f7e6a] focus:border-gold";
}

export function AdminDashboard({ initialState }: AdminDashboardProps) {
  const router = useRouter();
  const [state, setState] = useState<AdminState>(initialState);
  const [status, setStatus] = useState("Ready to save draft changes.");
  const [saving, setSaving] = useState(false);

  const saveState = async () => {
    setSaving(true);
    setStatus("Saving changes...");
    try {
      const response = await fetch("/api/admin/state", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ state }),
      });
      if (!response.ok) {
        throw new Error("Failed to save state");
      }
      setStatus("Draft saved successfully.");
    } catch {
      setStatus("Could not save changes. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const updateHeroBanner = (
    index: number,
    key: keyof AdminHeroBanner,
    value: string
  ) => {
    setState((current) => ({
      ...current,
      heroBanners: current.heroBanners.map((banner, bannerIndex) =>
        bannerIndex === index ? { ...banner, [key]: value } : banner
      ),
    }));
  };

  const updateCollection = (
    index: number,
    key: keyof AdminCollection,
    value: string | boolean
  ) => {
    setState((current) => ({
      ...current,
      collections: current.collections.map((collection, collectionIndex) =>
        collectionIndex === index ? { ...collection, [key]: value } : collection
      ),
    }));
  };

  const updateProduct = (
    index: number,
    key: keyof AdminProduct,
    value: string | number | boolean
  ) => {
    setState((current) => ({
      ...current,
      products: current.products.map((product, productIndex) =>
        productIndex === index ? { ...product, [key]: value } : product
      ),
    }));
  };

  const updateOffer = (
    index: number,
    key: keyof AdminOffer,
    value: string | boolean
  ) => {
    setState((current) => ({
      ...current,
      offers: current.offers.map((offer, offerIndex) =>
        offerIndex === index ? { ...offer, [key]: value } : offer
      ),
    }));
  };

  return (
    <div className="space-y-8">
      <div className="luxury-panel flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between md:p-8">
        <div>
          <p className="text-xs uppercase tracking-[0.45em] text-gold/70">Owner Dashboard</p>
          <h2 className="mt-3 font-serif text-3xl text-[#2b1c15]">Luxury content control</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--color-text-muted)]">
            Edit the draft homepage banners, products, collections, offers, and gold rates from one simple screen.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button type="button" onClick={saveState} className="btn-gold">
            <Save className="h-4 w-4" />
            {saving ? "Saving..." : "Save Draft"}
          </button>
          <button type="button" onClick={logout} className="btn-outline-gold">
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </div>

      <div className="luxury-panel p-5 md:p-7">
        <div className="flex items-center gap-3 text-gold">
          <Sparkles className="h-5 w-5" />
          <p className="text-sm uppercase tracking-[0.35em] text-gold/70">Status</p>
        </div>
        <p className="mt-3 text-sm text-[var(--color-text-muted)]">{status}</p>
      </div>

      <section className="grid gap-6 xl:grid-cols-2">
        <div className="luxury-card p-6 md:p-7">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-gold/70">Gold Rates</p>
              <h3 className="mt-2 font-serif text-2xl text-[#2b1c15]">Update live pricing</h3>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2">
              <span className="text-xs uppercase tracking-[0.3em] text-[var(--color-text-muted)]">22K Rate</span>
              <input
                className={fieldClassName()}
                type="number"
                value={state.goldPrice.price22k}
                onChange={(event) =>
                  setState((current) => ({
                    ...current,
                    goldPrice: {
                      ...current.goldPrice,
                      price22k: Number(event.target.value),
                    },
                  }))
                }
              />
            </label>
            <label className="space-y-2">
              <span className="text-xs uppercase tracking-[0.3em] text-[var(--color-text-muted)]">24K Rate</span>
              <input
                className={fieldClassName()}
                type="number"
                value={state.goldPrice.price24k}
                onChange={(event) =>
                  setState((current) => ({
                    ...current,
                    goldPrice: {
                      ...current.goldPrice,
                      price24k: Number(event.target.value),
                    },
                  }))
                }
              />
            </label>
          </div>
          <label className="mt-4 block space-y-2">
            <span className="text-xs uppercase tracking-[0.3em] text-[var(--color-text-muted)]">Gold Note</span>
            <textarea
              className={`${fieldClassName()} min-h-[110px]`}
              value={state.goldPrice.note}
              onChange={(event) =>
                setState((current) => ({
                  ...current,
                  goldPrice: {
                    ...current.goldPrice,
                    note: event.target.value,
                  },
                }))
              }
            />
          </label>
        </div>

        <div className="luxury-card p-6 md:p-7">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-gold/70">Hero Banners</p>
              <h3 className="mt-2 font-serif text-2xl text-[#2b1c15]">Control the first impression</h3>
            </div>
            <button
              type="button"
              className="btn-outline-gold"
              onClick={() =>
                setState((current) => ({
                  ...current,
                  heroBanners: [
                    ...current.heroBanners,
                    {
                      id: `hero-${Date.now()}`,
                      title: "New Luxury Banner",
                      subtitle: "Add premium bridal or temple copy here.",
                      buttonText: "View Now",
                      buttonLink: "/collections",
                      imageUrl: JEWELRY_IMAGES.hero[0],
                    },
                  ],
                }))
              }
            >
              <Plus className="h-4 w-4" />
              Add Banner
            </button>
          </div>
          <div className="space-y-5">
            {state.heroBanners.map((banner, index) => (
              <div key={banner.id} className="rounded-[1.5rem] border border-gold/10 bg-white/55 p-4">
                <div className="grid gap-3 md:grid-cols-2">
                  <input className={fieldClassName()} value={banner.title} onChange={(event) => updateHeroBanner(index, "title", event.target.value)} />
                  <input className={fieldClassName()} value={banner.buttonText} onChange={(event) => updateHeroBanner(index, "buttonText", event.target.value)} />
                  <input className={fieldClassName()} value={banner.buttonLink} onChange={(event) => updateHeroBanner(index, "buttonLink", event.target.value)} />
                  <input className={fieldClassName()} value={banner.imageUrl} onChange={(event) => updateHeroBanner(index, "imageUrl", event.target.value)} />
                </div>
                <textarea
                  className={`${fieldClassName()} mt-3 min-h-[90px]`}
                  value={banner.subtitle}
                  onChange={(event) => updateHeroBanner(index, "subtitle", event.target.value)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="luxury-card p-6 md:p-7">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-gold/70">Collections</p>
              <h3 className="mt-2 font-serif text-2xl text-[#2b1c15]">Edit collection cards</h3>
            </div>
            <button
              type="button"
              className="btn-outline-gold"
              onClick={() =>
                setState((current) => ({
                  ...current,
                  collections: [
                    ...current.collections,
                    {
                      id: `collection-${Date.now()}`,
                      name: "New Collection",
                      slug: "new-collection",
                      description: "Describe the collection here.",
                      imageUrl: JEWELRY_IMAGES.temple,
                      featured: true,
                    },
                  ],
                }))
              }
            >
              <Plus className="h-4 w-4" />
              Add Collection
            </button>
          </div>
          <div className="space-y-5">
            {state.collections.map((collection, index) => (
              <div key={collection.id} className="rounded-[1.5rem] border border-gold/10 bg-white/55 p-4">
                <div className="grid gap-3 md:grid-cols-2">
                  <input className={fieldClassName()} value={collection.name} onChange={(event) => updateCollection(index, "name", event.target.value)} />
                  <input className={fieldClassName()} value={collection.slug} onChange={(event) => updateCollection(index, "slug", event.target.value)} />
                  <input className={fieldClassName()} value={collection.imageUrl} onChange={(event) => updateCollection(index, "imageUrl", event.target.value)} />
                  <label className="flex items-center gap-3 rounded-2xl border border-gold/15 px-4 py-3 text-sm text-[#2b1c15]">
                    <input
                      type="checkbox"
                      checked={collection.featured}
                      onChange={(event) => updateCollection(index, "featured", event.target.checked)}
                    />
                    Featured
                  </label>
                </div>
                <textarea
                  className={`${fieldClassName()} mt-3 min-h-[90px]`}
                  value={collection.description}
                  onChange={(event) => updateCollection(index, "description", event.target.value)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="luxury-card p-6 md:p-7">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-gold/70">Products</p>
              <h3 className="mt-2 font-serif text-2xl text-[#2b1c15]">Add product drafts</h3>
            </div>
            <button
              type="button"
              className="btn-outline-gold"
              onClick={() =>
                setState((current) => ({
                  ...current,
                  products: [
                    ...current.products,
                    {
                      id: `product-${Date.now()}`,
                      name: "New Product",
                      category: "gold",
                      price: 0,
                      imageUrl: JEWELRY_IMAGES.default,
                      featured: false,
                    },
                  ],
                }))
              }
            >
              <Plus className="h-4 w-4" />
              Add Product
            </button>
          </div>
          <div className="space-y-5">
            {state.products.map((product, index) => (
              <div key={product.id} className="rounded-[1.5rem] border border-gold/10 bg-white/55 p-4">
                <div className="grid gap-3 md:grid-cols-2">
                  <input className={fieldClassName()} value={product.name} onChange={(event) => updateProduct(index, "name", event.target.value)} />
                  <input className={fieldClassName()} value={product.category} onChange={(event) => updateProduct(index, "category", event.target.value)} />
                  <input className={fieldClassName()} type="number" value={product.price} onChange={(event) => updateProduct(index, "price", Number(event.target.value))} />
                  <input className={fieldClassName()} value={product.imageUrl} onChange={(event) => updateProduct(index, "imageUrl", event.target.value)} />
                  <label className="flex items-center gap-3 rounded-2xl border border-gold/15 px-4 py-3 text-sm text-[#2b1c15]">
                    <input
                      type="checkbox"
                      checked={product.featured}
                      onChange={(event) => updateProduct(index, "featured", event.target.checked)}
                    />
                    Featured
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="luxury-card p-6 md:p-7">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-gold/70">Offers</p>
              <h3 className="mt-2 font-serif text-2xl text-[#2b1c15]">Manage active offers</h3>
            </div>
            <button
              type="button"
              className="btn-outline-gold"
              onClick={() =>
                setState((current) => ({
                  ...current,
                  offers: [
                    ...current.offers,
                    {
                      id: `offer-${Date.now()}`,
                      title: "New Offer",
                      discount: "Special",
                      description: "Describe the offer here.",
                      active: true,
                    },
                  ],
                }))
              }
            >
              <Plus className="h-4 w-4" />
              Add Offer
            </button>
          </div>
          <div className="space-y-5">
            {state.offers.map((offer, index) => (
              <div key={offer.id} className="rounded-[1.5rem] border border-gold/10 bg-white/55 p-4">
                <div className="grid gap-3 md:grid-cols-2">
                  <input className={fieldClassName()} value={offer.title} onChange={(event) => updateOffer(index, "title", event.target.value)} />
                  <input className={fieldClassName()} value={offer.discount} onChange={(event) => updateOffer(index, "discount", event.target.value)} />
                  <label className="flex items-center gap-3 rounded-2xl border border-gold/15 px-4 py-3 text-sm text-[#2b1c15]">
                    <input
                      type="checkbox"
                      checked={offer.active}
                      onChange={(event) => updateOffer(index, "active", event.target.checked)}
                    />
                    Active
                  </label>
                </div>
                <textarea
                  className={`${fieldClassName()} mt-3 min-h-[90px]`}
                  value={offer.description}
                  onChange={(event) => updateOffer(index, "description", event.target.value)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
