import { NextResponse } from "next/server";
import { z } from "zod";
import { connectToDatabase } from "@/lib/db";
import { requireAdmin } from "@/lib/api-auth";
import { ProductModel } from "@/lib/models";

const productSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().min(10),
  category: z.string().min(1),
  tags: z.array(z.string()).optional(),
  media: z.array(z.object({ url: z.string().url(), type: z.enum(["image", "video"]) })).optional(),
  goldPurity: z.string().default("22K"),
  weightInGrams: z.number().positive(),
  makingCharge: z.number().nonnegative().default(0),
  wastagePercent: z.number().nonnegative().default(0),
  estimatedPrice: z.number().positive(),
  stock: z.number().int().nonnegative().default(0),
  isAvailable: z.boolean().default(true),
  isTrending: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
});

export async function GET(request: Request) {
  await connectToDatabase();
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");
  const category = searchParams.get("category");
  const sort = searchParams.get("sort") || "newest";

  const filter: Record<string, unknown> = {};
  if (q) filter.name = { $regex: q, $options: "i" };
  if (category) filter.category = category;

  const sortMap: Record<string, Record<string, 1 | -1>> = {
    newest: { createdAt: -1 },
    priceAsc: { estimatedPrice: 1 },
    priceDesc: { estimatedPrice: -1 },
  };

  const products = await ProductModel.find(filter)
    .populate("category", "name slug")
    .sort(sortMap[sort] || sortMap.newest);
  return NextResponse.json({ products });
}

export async function POST(request: Request) {
  const auth = await requireAdmin();
  if (auth.error) return auth.error;

  try {
    const body = await request.json();
    const payload = productSchema.parse(body);
    await connectToDatabase();
    const product = await ProductModel.create(payload);
    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 });
    }
    return NextResponse.json({ error: "Unable to create product" }, { status: 500 });
  }
}
