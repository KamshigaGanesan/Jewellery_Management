import { NextResponse } from "next/server";
import { z } from "zod";

const forgotSchema = z.object({
  email: z.string().email(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    forgotSchema.parse(body);
    return NextResponse.json({
      message: "Password reset link would be sent via email integration.",
    });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
