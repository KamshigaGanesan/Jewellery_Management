import { NextResponse } from "next/server";
import { z } from "zod";
import { connectToDatabase } from "@/lib/db";
import { requireAuth } from "@/lib/api-auth";
import { WishlistModel } from "@/lib/models";

export async function GET() {
  const auth = await requireAuth();
  if (auth.error) return auth.error;
  if (!auth.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectToDatabase();

  const wishlist = await WishlistModel.findOne({ user: auth.user.id }).populate("products");
  return NextResponse.json({ wishlist: wishlist?.products || [] });
}

export async function POST(request: Request) {
  const auth = await requireAuth();
  if (auth.error) return auth.error;
  if (!auth.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const schema = z.object({ productId: z.string() });
  try {
    const payload = schema.parse(await request.json());
    await connectToDatabase();
    const wishlist = await WishlistModel.findOneAndUpdate(
      { user: auth.user.id },
      { $addToSet: { products: payload.productId } },
      { upsert: true, new: true },
    );
    return NextResponse.json({ wishlist });
  } catch {
    return NextResponse.json({ error: "Unable to add wishlist item" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const auth = await requireAuth();
  if (auth.error) return auth.error;
  if (!auth.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const schema = z.object({ productId: z.string() });
  try {
    const payload = schema.parse(await request.json());
    await connectToDatabase();
    const wishlist = await WishlistModel.findOneAndUpdate(
      { user: auth.user.id },
      { $pull: { products: payload.productId } },
      { new: true },
    );
    return NextResponse.json({ wishlist });
  } catch {
    return NextResponse.json({ error: "Unable to remove wishlist item" }, { status: 500 });
  }
}
