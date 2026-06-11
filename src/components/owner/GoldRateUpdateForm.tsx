"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Save } from "lucide-react";

type GoldRateSummary = {
  recordedOn: string | null;
  gold22k: number | null;
  gold24k: number | null;
};

const today = new Date().toISOString().slice(0, 10);

export function GoldRateUpdateForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("Enter today’s rates and save.");
  const [rates, setRates] = useState<GoldRateSummary>({
    recordedOn: today,
    gold22k: null,
    gold24k: null,
  });

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        const response = await fetch("/api/gold-rates", { cache: "no-store", signal: controller.signal });
        if (!response.ok) return;
        const data = (await response.json()) as { rates?: GoldRateSummary };
        setRates((current) => ({
          recordedOn: data.rates?.recordedOn || current.recordedOn,
          gold22k: data.rates?.gold22k ?? current.gold22k,
          gold24k: data.rates?.gold24k ?? current.gold24k,
        }));
      } catch {
        if (!controller.signal.aborted) setStatus("Could not load current rates.");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, []);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setStatus("Saving rates...");

    try {
      const response = await fetch("/api/gold-rates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: rates.recordedOn || today,
          gold22k: Number(rates.gold22k),
          gold24k: Number(rates.gold24k),
          updatedBy: "Owner",
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Unable to save rates");
      }
      setStatus("Gold rates updated.");
      router.refresh();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unable to update rates.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block space-y-2">
          <span className="text-xs uppercase tracking-[0.3em] text-[var(--color-text-muted)]">22K gold rate</span>
          <input
            type="number"
            min={1}
            required
            value={rates.gold22k ?? ""}
            onChange={(event) => setRates((current) => ({ ...current, gold22k: Number(event.target.value) }))}
            className="w-full rounded-2xl border border-gold/15 bg-white/85 px-4 py-3 text-[#2b1c15] outline-none focus:border-gold"
            placeholder="Enter 22K rate"
            disabled={loading}
          />
        </label>
        <label className="block space-y-2">
          <span className="text-xs uppercase tracking-[0.3em] text-[var(--color-text-muted)]">24K gold rate</span>
          <input
            type="number"
            min={1}
            required
            value={rates.gold24k ?? ""}
            onChange={(event) => setRates((current) => ({ ...current, gold24k: Number(event.target.value) }))}
            className="w-full rounded-2xl border border-gold/15 bg-white/85 px-4 py-3 text-[#2b1c15] outline-none focus:border-gold"
            placeholder="Enter 24K rate"
            disabled={loading}
          />
        </label>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-[var(--color-text-muted)]">Rates save directly to MongoDB and refresh the site automatically.</p>
        <button type="submit" disabled={saving} className="btn-gold inline-flex items-center gap-2">
          <Save className="h-4 w-4" />
          {saving ? "Saving..." : "Save Rates"}
        </button>
      </div>

      <p className="text-sm text-[var(--color-text-muted)]">{status}</p>
    </form>
  );
}
