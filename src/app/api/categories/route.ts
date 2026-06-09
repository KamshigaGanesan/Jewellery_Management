import { NextResponse } from "next/server";
import { z } from "zod";
import { connectToDatabase } from "@/lib/db";
import { requireAdmin } from "@/lib/api-auth";
import { CategoryModel } from "@/lib/models";

const categorySchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().optional(),
  image: z.string().optional(),
});

export async function GET() {
  await connectToDatabase();
  const categories = await CategoryModel.find().sort({ name: 1 });
  return NextResponse.json({ categories });
}

export async function POST(request: Request) {
  const auth = await requireAdmin();
  if (auth.error) return auth.error;

  try {
    const payload = categorySchema.parse(await request.json());
    await connectToDatabase();
    const category = await CategoryModel.create(payload);
    return NextResponse.json({ category }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Unable to create category" }, { status: 500 });
  }
}
