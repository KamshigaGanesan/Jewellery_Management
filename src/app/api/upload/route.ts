import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/api-auth";
import { uploadToCloudinary } from "@/lib/cloudinary";

export async function POST(request: Request) {
  const auth = await requireAdmin();
  if (auth.error) return auth.error;

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const type = (formData.get("type") as "image" | "video" | null) || "image";
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    const upload = await uploadToCloudinary(buffer, "indiran/products", type);
    return NextResponse.json(upload);
  } catch {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
