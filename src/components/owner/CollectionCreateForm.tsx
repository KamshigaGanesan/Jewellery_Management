"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ImagePlus, Save } from "lucide-react";

const CATEGORY_HINTS = ["Bridal", "Temple", "Thali", "Haram", "Jimikki", "Bangles", "Rings", "Daily Wear"];

export function CollectionCreateForm() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("Add a new piece and publish it.");
  const [form, setForm] = useState({
    name: "",
    category: "Bridal",
    weightInGrams: "",
    estimatedPrice: "",
    image: null as File | null,
  });

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.image) {
      setStatus("Please choose an image first.");
      return;
    }

    setSaving(true);
    setStatus("Uploading image...");

    try {
      const uploadData = new FormData();
      uploadData.append("file", form.image);
      uploadData.append("type", "image");

      const uploadResponse = await fetch("/api/upload", { method: "POST", body: uploadData });
      const uploadResult = await uploadResponse.json();
      if (!uploadResponse.ok) {
        throw new Error(uploadResult.error || "Image upload failed");
      }

      setStatus("Publishing collection...");
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          category: form.category,
          weightInGrams: Number(form.weightInGrams),
          estimatedPrice: form.estimatedPrice ? Number(form.estimatedPrice) : undefined,
          imageUrl: uploadResult.url,
          media: [{ url: uploadResult.url, type: "image" }],
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Could not publish collection");
      }

      setForm({ name: "", category: form.category, weightInGrams: "", estimatedPrice: "", image: null });
      setStatus("Collection published successfully.");
      router.refresh();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Could not publish collection.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-5">
      <label className="block space-y-2">
        <span className="text-xs uppercase tracking-[0.3em] text-[var(--color-text-muted)]">Jewellery image</span>
        <div className="rounded-2xl border border-dashed border-gold/20 bg-white/75 p-4">
          <input
            type="file"
            accept="image/*"
            onChange={(event) => setForm((current) => ({ ...current, image: event.target.files?.[0] ?? null }))}
            className="w-full text-sm text-[var(--color-text-muted)] file:mr-4 file:rounded-full file:border-0 file:bg-gold file:px-4 file:py-2 file:text-sm file:font-medium file:text-charcoal-dark"
          />
        </div>
      </label>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block space-y-2 md:col-span-2">
          <span className="text-xs uppercase tracking-[0.3em] text-[var(--color-text-muted)]">Product name</span>
          <input
            type="text"
            required
            value={form.name}
            onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
            className="w-full rounded-2xl border border-gold/15 bg-white/85 px-4 py-3 text-[#2b1c15] outline-none focus:border-gold"
            placeholder="Example: Bridal Mango Necklace"
          />
        </label>
        <label className="block space-y-2">
          <span className="text-xs uppercase tracking-[0.3em] text-[var(--color-text-muted)]">Category</span>
          <input
            type="text"
            required
            value={form.category}
            onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))}
            className="w-full rounded-2xl border border-gold/15 bg-white/85 px-4 py-3 text-[#2b1c15] outline-none focus:border-gold"
            placeholder="Bridal, Temple, Thali..."
          />
        </label>
        <label className="block space-y-2">
          <span className="text-xs uppercase tracking-[0.3em] text-[var(--color-text-muted)]">Weight in grams</span>
          <input
            type="number"
            min={0.1}
            step="0.1"
            required
            value={form.weightInGrams}
            onChange={(event) => setForm((current) => ({ ...current, weightInGrams: event.target.value }))}
            className="w-full rounded-2xl border border-gold/15 bg-white/85 px-4 py-3 text-[#2b1c15] outline-none focus:border-gold"
            placeholder="0.0"
          />
        </label>
        <label className="block space-y-2 md:col-span-2">
          <span className="text-xs uppercase tracking-[0.3em] text-[var(--color-text-muted)]">Optional estimated price</span>
          <input
            type="number"
            min={1}
            step="1"
            value={form.estimatedPrice}
            onChange={(event) => setForm((current) => ({ ...current, estimatedPrice: event.target.value }))}
            className="w-full rounded-2xl border border-gold/15 bg-white/85 px-4 py-3 text-[#2b1c15] outline-none focus:border-gold"
            placeholder="Leave blank to auto-calculate"
          />
        </label>
      </div>

      <div className="flex flex-wrap gap-2">
        {CATEGORY_HINTS.map((hint) => (
          <button
            key={hint}
            type="button"
            onClick={() => setForm((current) => ({ ...current, category: hint }))}
            className="rounded-full border border-gold/15 bg-white/75 px-3 py-2 text-xs uppercase tracking-[0.22em] text-[var(--color-text-muted)] transition-colors hover:border-gold hover:text-gold"
          >
            {hint}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
          <ImagePlus className="h-4 w-4 text-gold" />
          Uploaded items appear on the homepage and collections page.
        </p>
        <button type="submit" disabled={saving} className="btn-gold inline-flex items-center gap-2">
          <Save className="h-4 w-4" />
          {saving ? "Publishing..." : "Publish"}
        </button>
      </div>

      <p className="text-sm text-[var(--color-text-muted)]">{status}</p>
    </form>
  );
}