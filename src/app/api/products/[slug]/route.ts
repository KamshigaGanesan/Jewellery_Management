import { NextResponse } from "next/server";
import { z } from "zod";
import { connectToDatabase } from "@/lib/db";
import { requireAdmin } from "@/lib/api-auth";
import { ProductModel } from "@/lib/models";

const patchSchema = z.object({
  name: z.string().min(2).optional(),
  description: z.string().min(10).optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  media: z.array(z.object({ url: z.string().url(), type: z.enum(["image", "video"]) })).optional(),
  goldPurity: z.string().optional(),
  weightInGrams: z.number().positive().optional(),
  makingCharge: z.number().nonnegative().optional(),
  wastagePercent: z.number().nonnegative().optional(),
  estimatedPrice: z.number().positive().optional(),
  stock: z.number().int().nonnegative().optional(),
  isAvailable: z.boolean().optional(),
  isTrending: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
});

export async function GET(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  await connectToDatabase();
  const { slug } = await params;
  const product = await ProductModel.findOne({ slug }).populate("category", "name slug");
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }
  return NextResponse.json({ product });
}

export async function PATCH(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const auth = await requireAdmin();
  if (auth.error) return auth.error;

  try {
    const payload = patchSchema.parse(await request.json());
    await connectToDatabase();
    const { slug } = await params;
    const product = await ProductModel.findOneAndUpdate({ slug }, payload, { new: true });
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json({ product });
  } catch {
    return NextResponse.json({ error: "Unable to update product" }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  const auth = await requireAdmin();
  if (auth.error) return auth.error;

  await connectToDatabase();
  const { slug } = await params;
  const result = await ProductModel.findOneAndDelete({ slug });
  if (!result) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
