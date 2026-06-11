import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { connectToDatabase } from "@/lib/db";
import { requireAdmin } from "@/lib/api-auth";
import { CategoryModel, GoldRateModel, ProductModel } from "@/lib/models";
import { summarizeGoldRates } from "@/lib/commerce";

const productSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2).optional(),
  description: z.string().min(10).optional(),
  category: z.string().min(1),
  tags: z.array(z.string()).optional(),
  media: z.array(z.object({ url: z.string().url(), type: z.enum(["image", "video"]) })).optional(),
  imageUrl: z.string().url().optional(),
  goldPurity: z.string().default("22K"),
  weightInGrams: z.number().positive(),
  makingCharge: z.number().nonnegative().default(0),
  wastagePercent: z.number().nonnegative().default(0),
  estimatedPrice: z.number().positive().optional(),
  stock: z.number().int().nonnegative().default(0),
  isAvailable: z.boolean().default(true),
  isTrending: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
  isNew: z.boolean().default(true),
});

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function titleCase(value: string) {
  return value
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

async function resolveCategoryId(categoryInput: string) {
  const normalized = slugify(categoryInput);
  const existing = await CategoryModel.findOne({ $or: [{ slug: normalized }, { name: categoryInput }] }).lean();
  if (existing) return String(existing._id);

  const created = await CategoryModel.create({
    name: titleCase(categoryInput),
    slug: normalized,
    description: "",
    image: "",
  });
  return String(created._id);
}

async function getDefaultEstimatedPrice(weightInGrams: number) {
  const latestRates = await GoldRateModel.find().sort({ recordedOn: -1, updatedAt: -1 }).limit(90).lean();
  const summary = summarizeGoldRates(latestRates);
  const rate = summary.gold22k ?? 1;
  return Math.max(Math.round(weightInGrams * rate), 1);
}

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
    const categoryId = await resolveCategoryId(payload.category);
    const slugBase = payload.slug || `${slugify(payload.name)}-${Date.now().toString(36)}`;
    const media = payload.media?.length
      ? payload.media
      : payload.imageUrl
        ? [{ url: payload.imageUrl, type: "image" as const }]
        : [];

    const product = await ProductModel.create({
      ...payload,
      slug: slugBase,
      category: categoryId,
      description: payload.description || `${payload.name} jewellery piece with simple owner-managed pricing.`,
      media,
      estimatedPrice: payload.estimatedPrice ?? (await getDefaultEstimatedPrice(payload.weightInGrams)),
      isNew: true,
      isFeatured: payload.isFeatured ?? false,
      isTrending: payload.isTrending ?? false,
    });

    revalidatePath("/");
    revalidatePath("/collections");
    revalidatePath(`/products/${product.slug}`);
    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 });
    }
    return NextResponse.json({ error: "Unable to create product" }, { status: 500 });
  }
}
