import { NextResponse } from "next/server";
import { readAdminState, writeAdminState } from "@/lib/admin-store";
import type { AdminState } from "@/lib/admin-state";

export async function GET() {
  const state = await readAdminState();
  return NextResponse.json(state);
}

export async function PUT(request: Request) {
  const body = (await request.json().catch(() => ({}))) as
    | { state?: AdminState }
    | { section?: keyof AdminState; value?: unknown };

  if ("state" in body && body.state) {
    await writeAdminState(body.state);
    return NextResponse.json({ ok: true, state: body.state });
  }

  const current = await readAdminState();

  if ("section" in body && body.section) {
    const nextState = {
      ...current,
      [body.section]: body.value,
    } as AdminState;
    await writeAdminState(nextState);
    return NextResponse.json({ ok: true, state: nextState });
  }

  return NextResponse.json({ ok: false, message: "Invalid payload" }, { status: 400 });
}