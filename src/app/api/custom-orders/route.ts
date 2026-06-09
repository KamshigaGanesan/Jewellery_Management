import { NextResponse } from "next/server";
import { z } from "zod";
import { connectToDatabase } from "@/lib/db";
import { getCurrentUserFromCookie, requireAdmin } from "@/lib/api-auth";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { CustomOrderModel } from "@/lib/models";

const customOrderSchema = z.object({
  customerName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  budget: z.coerce.number().positive(),
  goldType: z.enum(["22K", "24K", "Silver"]),
  description: z.string().min(10),
  notes: z.string().optional(),
});

export async function GET() {
  const user = await getCurrentUserFromCookie();
  await connectToDatabase();

  const filter = user?.role === "admin" ? {} : user ? { user: user.id } : {};
  if (!user) {
    return NextResponse.json({ orders: [] });
  }

  const orders = await CustomOrderModel.find(filter).sort({ createdAt: -1 });
  return NextResponse.json({ orders });
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const image = formData.get("image");
    if (!(image instanceof File)) {
      return NextResponse.json({ error: "Image is required" }, { status: 400 });
    }

    const parsed = customOrderSchema.parse({
      customerName: formData.get("customerName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      budget: formData.get("budget"),
      goldType: formData.get("goldType"),
      description: formData.get("description"),
      notes: formData.get("notes"),
    });

    const user = await getCurrentUserFromCookie();
    const fileBuffer = Buffer.from(await image.arrayBuffer());
    const upload = await uploadToCloudinary(fileBuffer, "indiran/custom-orders");

    await connectToDatabase();
    const customOrder = await CustomOrderModel.create({
      ...parsed,
      user: user?.id,
      inspirationImage: upload.url,
    });
    return NextResponse.json({ customOrder }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Unable to submit custom order" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const auth = await requireAdmin();
  if (auth.error) return auth.error;

  const schema = z.object({
    id: z.string(),
    status: z.enum(["new", "reviewing", "quoted", "approved", "rejected"]).optional(),
    quotationAmount: z.number().nonnegative().optional(),
    notes: z.string().optional(),
  });

  try {
    const payload = schema.parse(await request.json());
    await connectToDatabase();
    const order = await CustomOrderModel.findByIdAndUpdate(payload.id, payload, { new: true });
    return NextResponse.json({ order });
  } catch {
    return NextResponse.json({ error: "Unable to update order" }, { status: 500 });
  }
}
