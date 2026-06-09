import { NextResponse } from "next/server";
import { z } from "zod";
import { connectToDatabase } from "@/lib/db";
import { requireAdmin } from "@/lib/api-auth";
import { GoldRateModel } from "@/lib/models";
import { summarizeGoldRates } from "@/lib/commerce";

const singleRateSchema = z.object({
  type: z.enum(["22K", "24K", "Silver"]),
  pricePerGram: z.coerce.number().positive(),
});

const goldRateSchema = z
  .object({
    recordedOn: z.string().min(8).optional(),
    updatedBy: z.string().optional(),
    rates: z.array(singleRateSchema).optional(),
    date: z.string().min(8).optional(),
    gold22k: z.coerce.number().positive().optional(),
    gold24k: z.coerce.number().positive().optional(),
    silver: z.coerce.number().positive().optional(),
  })
  .refine((value) => Boolean(value.rates?.length || (value.gold22k && value.gold24k && value.silver)), {
    message: "Provide rates or legacy gold22k, gold24k and silver values.",
  });

const patchSchema = z.object({
  id: z.string().min(1),
  pricePerGram: z.coerce.number().positive().optional(),
  recordedOn: z.string().min(8).optional(),
  updatedBy: z.string().optional(),
});

const deleteSchema = z.object({
  id: z.string().min(1),
});

async function loadRateSummary() {
  const rates = await GoldRateModel.find().sort({ recordedOn: -1, updatedAt: -1 }).limit(120).lean();
  return summarizeGoldRates(rates);
}

export async function GET() {
  await connectToDatabase();
  const rates = await loadRateSummary();
  return NextResponse.json({ rates });
}

export async function POST(request: Request) {
  const auth = await requireAdmin();
  if (auth.error) return auth.error;

  try {
    const payload = goldRateSchema.parse(await request.json());
    const recordedOn = payload.recordedOn || payload.date || new Date().toISOString().slice(0, 10);
    const updatedBy = payload.updatedBy || "Admin";
    const rates =
      payload.rates || [
        { type: "22K" as const, pricePerGram: payload.gold22k as number },
        { type: "24K" as const, pricePerGram: payload.gold24k as number },
        { type: "Silver" as const, pricePerGram: payload.silver as number },
      ];
    await connectToDatabase();
    const savedRates = [];
    for (const rate of rates) {
      const previous = await GoldRateModel.findOne({ type: rate.type }).sort({ recordedOn: -1, updatedAt: -1 }).lean();
      const saved = await GoldRateModel.findOneAndUpdate(
        { recordedOn, type: rate.type },
        {
          type: rate.type,
          pricePerGram: rate.pricePerGram,
          recordedOn,
          updatedBy,
          previousPricePerGram: previous?.pricePerGram ?? null,
          changeDirection:
            typeof previous?.pricePerGram === "number"
              ? rate.pricePerGram > previous.pricePerGram
                ? "up"
                : rate.pricePerGram < previous.pricePerGram
                  ? "down"
                  : "same"
              : "same",
        },
        { new: true, upsert: true },
      );
      savedRates.push(saved);
    }
    if (!savedRates.length) {
      return NextResponse.json({ error: "No rates updated" }, { status: 400 });
    }

    const ratesSummary = await loadRateSummary();
    return NextResponse.json({ rates: ratesSummary });
  } catch {
    return NextResponse.json({ error: "Unable to update gold rate" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const auth = await requireAdmin();
  if (auth.error) return auth.error;

  try {
    const payload = patchSchema.parse(await request.json());
    await connectToDatabase();

    const existing = await GoldRateModel.findById(payload.id);
    if (!existing) {
      return NextResponse.json({ error: "Rate entry not found" }, { status: 404 });
    }

    const updateData = {
      ...(typeof payload.pricePerGram === "number" ? { pricePerGram: payload.pricePerGram } : {}),
      ...(payload.recordedOn ? { recordedOn: payload.recordedOn } : {}),
      ...(payload.updatedBy ? { updatedBy: payload.updatedBy } : {}),
    };

    await GoldRateModel.findByIdAndUpdate(payload.id, updateData, { new: true });
    const ratesSummary = await loadRateSummary();
    return NextResponse.json({ rates: ratesSummary });
  } catch {
    return NextResponse.json({ error: "Unable to edit gold rate entry" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const auth = await requireAdmin();
  if (auth.error) return auth.error;

  try {
    const payload = deleteSchema.parse(await request.json());
    await connectToDatabase();
    const deleted = await GoldRateModel.findByIdAndDelete(payload.id);
    if (!deleted) {
      return NextResponse.json({ error: "Rate entry not found" }, { status: 404 });
    }
    const ratesSummary = await loadRateSummary();
    return NextResponse.json({ rates: ratesSummary });
  } catch {
    return NextResponse.json({ error: "Unable to delete gold rate entry" }, { status: 500 });
  }
}
