import type { Metadata } from "next";
import { connectToDatabase } from "@/lib/db";
import { GoldRateModel } from "@/lib/models";
import { summarizeGoldRates } from "@/lib/commerce";
import { ArrowDownRight, ArrowUpRight, Minus, TrendingUp } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Daily Gold Price",
  description: "Live 22K and 24K gold rates for Indiran Jewellers.",
};

export default async function GoldPricePage() {
  await connectToDatabase();
  const rates = await GoldRateModel.find().sort({ recordedOn: -1, updatedAt: -1 }).limit(90).lean();
  const summary = summarizeGoldRates(rates);
  const latestRates = summary.history.filter((rate) => rate.type === "22K" || rate.type === "24K").slice(0, 4);
  const trendPoints = summary.history
    .slice()
    .reverse()
    .reduce<Array<{ date: string; gold22k: number | null; gold24k: number | null }>>((points, record) => {
      const last = points[points.length - 1];
      if (last?.date === record.recordedOn) {
        last.gold22k = record.type === "22K" ? record.pricePerGram : last.gold22k;
        last.gold24k = record.type === "24K" ? record.pricePerGram : last.gold24k;
        return points;
      }
      points.push({
        date: record.recordedOn,
        gold22k: record.type === "22K" ? record.pricePerGram : null,
        gold24k: record.type === "24K" ? record.pricePerGram : null,
      });
      return points;
    }, [])
    .filter((point) => point.gold22k !== null || point.gold24k !== null)
    .slice(-12);

  const seriesValues = trendPoints.flatMap((point) => [point.gold22k, point.gold24k]).filter((value): value is number => typeof value === "number");
  const minValue = seriesValues.length > 0 ? Math.min(...seriesValues) : 0;
  const maxValue = seriesValues.length > 0 ? Math.max(...seriesValues) : 1;
  const range = Math.max(maxValue - minValue, 1);

  const buildPolyline = (key: "gold22k" | "gold24k") => {
    const values = trendPoints
      .map((point) => point[key])
      .filter((value): value is number => typeof value === "number");
    if (values.length === 0) return "";
    return values
      .map((value, index) => {
        const x = values.length === 1 ? 50 : (index / (values.length - 1)) * 100;
        const y = 100 - ((value - minValue) / range) * 100;
        return `${x},${y}`;
      })
      .join(" ");
  };

  const trendIcon = (change: number) => {
    if (change > 0) return <ArrowUpRight className="h-4 w-4 text-emerald-500" />;
    if (change < 0) return <ArrowDownRight className="h-4 w-4 text-rose-500" />;
    return <Minus className="h-4 w-4 text-[var(--color-text-muted)]" />;
  };

  return (
    <section className="mx-auto max-w-5xl px-4 pb-14 pt-24 md:px-8 md:pt-28">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-gold/70">Daily Gold Price</p>
          <h1 className="heading-lg mt-2">Track 22K and 24K changes clearly</h1>
          <p className="text-muted mt-2 text-sm">Live daily prices, change direction, and a quick trend view for buyers.</p>
        </div>
        <div className="rounded-2xl border border-gold/15 bg-white/70 px-4 py-3 text-sm text-[var(--color-text-muted)]">
          <p>Latest update</p>
          <p className="mt-1 font-semibold text-[var(--color-text)]">{summary.recordedOn || "Pending"}</p>
        </div>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="luxury-card p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-[var(--color-text-muted)]">22K Gold</p>
              <p className="mt-2 font-serif text-3xl text-gold">Rs. {summary.gold22k?.toLocaleString("en-LK") ?? "-"}</p>
            </div>
            {trendIcon(summary.change22k)}
          </div>
          <p className="mt-3 text-sm text-[var(--color-text-muted)]">Change: {summary.change22k >= 0 ? "+" : ""}{summary.change22k.toLocaleString("en-LK")} per gram</p>
        </div>
        <div className="luxury-card p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-[var(--color-text-muted)]">24K Gold</p>
              <p className="mt-2 font-serif text-3xl text-gold">Rs. {summary.gold24k?.toLocaleString("en-LK") ?? "-"}</p>
            </div>
            {trendIcon(summary.change24k)}
          </div>
          <p className="mt-3 text-sm text-[var(--color-text-muted)]">Change: {summary.change24k >= 0 ? "+" : ""}{summary.change24k.toLocaleString("en-LK")} per gram</p>
        </div>
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="luxury-card p-5 md:p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-gold/70">Trend Graph</p>
              <h2 className="mt-2 font-serif text-2xl text-[#2b1c15]">Increase and decrease over recent updates</h2>
            </div>
            <div className="rounded-full border border-gold/15 bg-white/70 px-3 py-2 text-xs text-[var(--color-text-muted)]">
              <span className="inline-flex items-center gap-1"><TrendingUp className="h-4 w-4 text-gold" /> 22K</span>
              <span className="mx-2 text-[var(--color-border)]">|</span>
              <span className="inline-flex items-center gap-1"><TrendingUp className="h-4 w-4 text-gold" /> 24K</span>
            </div>
          </div>
          <div className="mt-5 rounded-[1.5rem] border border-gold/15 bg-[linear-gradient(180deg,rgba(255,255,255,0.78),rgba(255,248,238,0.92))] p-4">
            {trendPoints.length > 0 ? (
              <svg viewBox="0 0 100 100" className="h-64 w-full overflow-visible">
                <defs>
                  <linearGradient id="trend22" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#d4af37" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#d4af37" stopOpacity="0.08" />
                  </linearGradient>
                  <linearGradient id="trend24" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#8b5a2b" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#8b5a2b" stopOpacity="0.08" />
                  </linearGradient>
                </defs>
                {[0, 25, 50, 75, 100].map((line) => (
                  <line key={line} x1="0" x2="100" y1={line} y2={line} stroke="rgba(127,84,40,0.1)" strokeDasharray="2 4" />
                ))}
                <polyline fill="none" stroke="url(#trend22)" strokeWidth="2.5" points={buildPolyline("gold22k")} />
                <polyline fill="none" stroke="url(#trend24)" strokeWidth="2.5" points={buildPolyline("gold24k")} />
              </svg>
            ) : (
              <p className="py-16 text-center text-sm text-[var(--color-text-muted)]">No trend data yet.</p>
            )}
          </div>
        </div>
        <div className="luxury-card p-5 md:p-6">
          <h2 className="font-serif text-2xl text-[#2b1c15]">Latest entries</h2>
          <div className="mt-4 space-y-3 text-sm">
            {latestRates.map((rate) => (
              <div key={String(rate._id)} className="rounded-2xl border border-gold/12 bg-white/65 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-medium text-[#2b1c15]">{rate.type}</p>
                  <p className="text-gold">Rs. {rate.pricePerGram.toLocaleString("en-LK")}</p>
                </div>
                <p className="mt-2 text-xs text-[var(--color-text-muted)]">{rate.recordedOn} · {rate.updatedBy || "Admin"}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {rates.length === 0 && (
        <p className="mt-5 text-sm text-muted">No rates yet. Owner can add today&apos;s rate from the owner update page.</p>
      )}
    </section>
  );
}
