import { NextResponse } from "next/server";
import { getGallery } from "@/lib/content/fetch";

export async function GET() {
  const gallery = await getGallery();
  return NextResponse.json(gallery);
}
