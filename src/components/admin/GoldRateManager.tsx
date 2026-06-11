"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowDown, ArrowUp, Minus, Pencil, Trash2 } from "lucide-react";

type RateRecord = {
  _id: string;
  type: "22K" | "24K";
  pricePerGram: number;
  recordedOn: string;
  updatedBy?: string;
  changeDirection?: "up" | "down" | "same";
};

type GoldRateSummary = {
  recordedOn: string | null;
  updatedAt: string | null;
  updatedBy: string | null;
  gold22k: number | null;
  gold24k: number | null;
  change22k: number;
  change24k: number;
  history: RateRecord[];
};

const emptySummary: GoldRateSummary = {
  recordedOn: null,
  updatedAt: null,
  updatedBy: null,
  gold22k: null,
  gold24k: null,
  change22k: 0,
  change24k: 0,
  history: [],
};

function getDirectionIcon(direction?: "up" | "down" | "same") {
  if (direction === "up") return <ArrowUp className="h-4 w-4 text-emerald-500" />;
  if (direction === "down") return <ArrowDown className="h-4 w-4 text-rose-500" />;
  return <Minus className="h-4 w-4 text-[var(--color-text-muted)]" />;
}

export function GoldRateManager() {
  const [summary, setSummary] = useState<GoldRateSummary>(emptySummary);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [status, setStatus] = useState("Live rates ready.");
  const [form, setForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    gold22k: "",
    gold24k: "",
  });

  async function loadRates() {
    setLoading(true);
    try {
      const response = await fetch("/api/gold-rates", { cache: "no-store" });
      const data = await response.json();
      const nextSummary = data.rates || emptySummary;
      setSummary(nextSummary);
      setForm((current) => ({
        date: nextSummary.recordedOn || current.date,
        gold22k: nextSummary.gold22k ? String(nextSummary.gold22k) : current.gold22k,
        gold24k: nextSummary.gold24k ? String(nextSummary.gold24k) : current.gold24k,
      }));
    } catch {
      setStatus("Could not load rates.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadRates();
  }, []);

  const groupedHistory = useMemo(
    () => summary.history.filter((entry) => entry.type === "22K" || entry.type === "24K").slice(0, 18),
    [summary.history],
  );

  async function submitRates(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setStatus("Updating rates...");

    try {
      const response = await fetch("/api/gold-rates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: form.date,
          gold22k: Number(form.gold22k),
          gold24k: Number(form.gold24k),
          updatedBy: "Owner",
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Unable to save rates");
      }
      setSummary(data.rates || emptySummary);
      setStatus("Gold rates updated successfully.");
      setForm((current) => ({ ...current, gold22k: "", gold24k: "" }));
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unable to update rates.");
    } finally {
      setSaving(false);
    }
  }

  async function editEntry(entry: RateRecord) {
    const priceInput = window.prompt(`Edit ${entry.type} price per gram`, String(entry.pricePerGram));
    if (!priceInput) return;

    const parsed = Number(priceInput);
    if (!Number.isFinite(parsed) || parsed <= 0) {
      setStatus("Invalid price value.");
      return;
    }

    const response = await fetch("/api/gold-rates", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: entry._id, pricePerGram: parsed, updatedBy: "Owner" }),
    });
    const data = await response.json();
    if (!response.ok) {
      setStatus(data.error || "Unable to edit entry.");
      return;
    }

    setSummary(data.rates || emptySummary);
    setStatus(`${entry.type} rate updated.`);
  }

  async function deleteEntry(entry: RateRecord) {
    const confirmed = window.confirm(`Delete ${entry.type} entry on ${entry.recordedOn}?`);
    if (!confirmed) return;

    const response = await fetch("/api/gold-rates", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: entry._id }),
    });
    const data = await response.json();
    if (!response.ok) {
      setStatus(data.error || "Unable to delete entry.");
      return;
    }

    setSummary(data.rates || emptySummary);
    setStatus("Entry deleted.");
  }

  function fillFromLatest() {
    setForm((current) => ({
      ...current,
      gold22k: summary.gold22k ? String(summary.gold22k) : current.gold22k,
      gold24k: summary.gold24k ? String(summary.gold24k) : current.gold24k,
    }));
    setStatus("Filled latest values. Update only if needed, then click save.");
  }

  return (
    <div className="mt-8 space-y-5">
      <div className="luxury-card p-5 md:p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold">Daily Gold Rate Update</h2>
            <p className="text-muted mt-1 text-sm">Simple mode for owner: enter today&apos;s prices and click save once.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={fillFromLatest} className="btn-outline-gold">
              Use Latest Values
            </button>
            <button type="button" onClick={loadRates} className="btn-outline-gold">
              Refresh
            </button>
          </div>
        </div>

        <div className="mb-4 rounded-2xl border border-gold/15 bg-gold/5 p-4 text-sm text-[var(--color-text-muted)]">
          <p className="font-medium text-[var(--color-text)]">How to update (2 steps)</p>
          <p className="mt-1">1. Enter today&apos;s 22K and 24K price per gram.</p>
          <p>2. Click Save Today&apos;s Rates.</p>
        </div>

        <form onSubmit={submitRates} className="grid gap-3 md:grid-cols-3">
          <input
            type="date"
            required
            value={form.date}
            onChange={(event) => setForm((current) => ({ ...current, date: event.target.value }))}
            className="rounded-2xl border border-[var(--color-border)] bg-white/70 px-4 py-3 text-sm outline-none focus:border-gold"
          />
          <input
            type="number"
            required
            min={1}
            placeholder="22K price per gram"
            value={form.gold22k}
            onChange={(event) => setForm((current) => ({ ...current, gold22k: event.target.value }))}
            className="rounded-2xl border border-[var(--color-border)] bg-white/70 px-4 py-3 text-sm outline-none focus:border-gold"
          />
          <input
            type="number"
            required
            min={1}
            placeholder="24K price per gram"
            value={form.gold24k}
            onChange={(event) => setForm((current) => ({ ...current, gold24k: event.target.value }))}
            className="rounded-2xl border border-[var(--color-border)] bg-white/70 px-4 py-3 text-sm outline-none focus:border-gold"
          />
          <button disabled={saving} className="btn-gold md:col-span-3" type="submit">
            {saving ? "Saving rates..." : "Save Today\'s Rates"}
          </button>
        </form>

        <p className="text-muted mt-3 text-xs">{status}</p>
      </div>

      <div className="luxury-card overflow-hidden p-5 md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-lg font-semibold">Advanced (optional)</h3>
          <button
            type="button"
            onClick={() => setShowAdvanced((current) => !current)}
            className="btn-outline-gold"
          >
            {showAdvanced ? "Hide History" : "Show History & Edit"}
          </button>
        </div>

        {showAdvanced ? (
          <>
            {loading ? <p className="text-muted mt-3 text-sm">Loading rate history...</p> : null}
            {!loading && groupedHistory.length === 0 ? <p className="text-muted mt-3 text-sm">No rate entries yet.</p> : null}

            {!loading && groupedHistory.length > 0 ? (
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-gold/15 text-xs uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                      <th className="px-3 py-2">Date</th>
                      <th className="px-3 py-2">Type</th>
                      <th className="px-3 py-2">Price/Gram</th>
                      <th className="px-3 py-2">Trend</th>
                      <th className="px-3 py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groupedHistory.map((entry) => (
                      <tr key={entry._id} className="border-b border-[var(--color-border)]/60">
                        <td className="px-3 py-2">{entry.recordedOn}</td>
                        <td className="px-3 py-2">{entry.type}</td>
                        <td className="px-3 py-2">Rs. {entry.pricePerGram.toLocaleString()}</td>
                        <td className="px-3 py-2">{getDirectionIcon(entry.changeDirection)}</td>
                        <td className="px-3 py-2">
                          <div className="flex items-center gap-2">
                            <button type="button" onClick={() => editEntry(entry)} className="rounded-full border border-gold/20 p-2 text-gold hover:bg-gold/10" aria-label="Edit rate">
                              <Pencil className="h-3.5 w-3.5" />
                            </button>
                            <button type="button" onClick={() => deleteEntry(entry)} className="rounded-full border border-rose-300/50 p-2 text-rose-500 hover:bg-rose-500/10" aria-label="Delete rate">
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}
          </>
        ) : (
          <p className="text-muted mt-3 text-sm">
            Keep this closed for easy daily use. Open only if you need to edit old entries.
          </p>
        )}
      </div>
    </div>
  );
}
