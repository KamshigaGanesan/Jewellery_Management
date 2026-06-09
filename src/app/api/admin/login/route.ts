import { NextResponse } from "next/server";
import { ADMIN_EMAIL, ADMIN_PASSWORD } from "@/lib/admin-state";
import { signToken } from "@/lib/auth";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as {
    email?: string;
    password?: string;
  };

  if (body.email !== ADMIN_EMAIL || body.password !== ADMIN_PASSWORD) {
    return NextResponse.json({ ok: false, message: "Invalid password" }, { status: 401 });
  }

  const token = signToken({
    id: "configured-admin",
    email: ADMIN_EMAIL,
    role: "admin",
  });

  const response = NextResponse.json({
    ok: true,
    user: { id: "configured-admin", name: "Admin", email: ADMIN_EMAIL, role: "admin" },
  });
  response.cookies.set("ij_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
