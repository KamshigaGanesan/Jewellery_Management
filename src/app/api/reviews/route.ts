import { NextResponse } from "next/server";
import { z } from "zod";
import { connectToDatabase } from "@/lib/db";
import { requireAuth } from "@/lib/api-auth";
import { ReviewModel } from "@/lib/models";

const reviewSchema = z.object({
  product: z.string(),
  rating: z.number().int().min(1).max(5),
  comment: z.string().min(3),
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const product = searchParams.get("product");
  await connectToDatabase();
  const filter = product ? { product } : {};
  const reviews = await ReviewModel.find(filter).sort({ createdAt: -1 });
  return NextResponse.json({ reviews });
}

export async function POST(request: Request) {
  const auth = await requireAuth();
  if (auth.error) return auth.error;
  if (!auth.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const payload = reviewSchema.parse(await request.json());
    await connectToDatabase();
    const review = await ReviewModel.create({
      ...payload,
      user: auth.user.id,
    });
    return NextResponse.json({ review }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Unable to submit review" }, { status: 500 });
  }
}
