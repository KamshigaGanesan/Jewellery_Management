import { NextResponse } from "next/server";
import { z } from "zod";
import { connectToDatabase } from "@/lib/db";
import { hashPassword, signToken } from "@/lib/auth";
import { UserModel } from "@/lib/models";

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  password: z.string().min(6),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = registerSchema.parse(body);

    await connectToDatabase();
    const exists = await UserModel.findOne({ email: payload.email.toLowerCase() });
    if (exists) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const user = await UserModel.create({
      name: payload.name,
      email: payload.email.toLowerCase(),
      phone: payload.phone || "",
      passwordHash: await hashPassword(payload.password),
      role: "customer",
    });

    const token = signToken({
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    const response = NextResponse.json({
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
    response.cookies.set("ij_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return response;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 });
    }
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
