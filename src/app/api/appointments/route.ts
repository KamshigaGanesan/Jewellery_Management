import { NextResponse } from "next/server";
import { z } from "zod";
import { connectToDatabase } from "@/lib/db";
import { getCurrentUserFromCookie, requireAdmin } from "@/lib/api-auth";
import { AppointmentModel } from "@/lib/models";

const appointmentSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  date: z.string().min(4),
  time: z.string().min(2),
  mode: z.enum(["showroom", "video-call"]),
  occasion: z.string().optional(),
  notes: z.string().optional(),
});

export async function GET() {
  const user = await getCurrentUserFromCookie();
  if (!user) return NextResponse.json({ appointments: [] });

  await connectToDatabase();
  const filter = user.role === "admin" ? {} : { user: user.id };
  const appointments = await AppointmentModel.find(filter).sort({ createdAt: -1 });
  return NextResponse.json({ appointments });
}

export async function POST(request: Request) {
  try {
    const payload = appointmentSchema.parse(await request.json());
    const user = await getCurrentUserFromCookie();
    await connectToDatabase();
    const appointment = await AppointmentModel.create({
      ...payload,
      user: user?.id,
      occasion: payload.occasion || "bridal consultation",
    });
    return NextResponse.json({ appointment }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Unable to create appointment" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const auth = await requireAdmin();
  if (auth.error) return auth.error;

  const schema = z.object({
    id: z.string(),
    status: z.enum(["pending", "approved", "completed", "cancelled"]),
  });
  try {
    const payload = schema.parse(await request.json());
    await connectToDatabase();
    const appointment = await AppointmentModel.findByIdAndUpdate(
      payload.id,
      { status: payload.status },
      { new: true },
    );
    return NextResponse.json({ appointment });
  } catch {
    return NextResponse.json({ error: "Unable to update appointment" }, { status: 500 });
  }
}
