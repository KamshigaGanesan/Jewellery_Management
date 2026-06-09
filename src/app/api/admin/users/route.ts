import { NextResponse } from "next/server";
import { z } from "zod";
import { connectToDatabase } from "@/lib/db";
import { requireAdmin } from "@/lib/api-auth";
import { UserModel } from "@/lib/models";

export async function GET() {
  const auth = await requireAdmin();
  if (auth.error) return auth.error;
  await connectToDatabase();
  const users = await UserModel.find().select("-passwordHash").sort({ createdAt: -1 });
  return NextResponse.json({ users });
}

export async function PATCH(request: Request) {
  const auth = await requireAdmin();
  if (auth.error) return auth.error;

  const schema = z.object({
    userId: z.string(),
    isBlocked: z.boolean().optional(),
    role: z.enum(["admin", "customer"]).optional(),
  });

  try {
    const payload = schema.parse(await request.json());
    await connectToDatabase();
    const user = await UserModel.findByIdAndUpdate(payload.userId, payload, {
      new: true,
    }).select("-passwordHash");
    return NextResponse.json({ user });
  } catch {
    return NextResponse.json({ error: "Unable to update user" }, { status: 500 });
  }
}
