import { getCurrentUserFromCookie } from "@/lib/api-auth";
import { connectToDatabase } from "@/lib/db";
import { UserModel } from "@/lib/models";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const user = await getCurrentUserFromCookie();
  if (!user) {
    return <section className="px-4 pt-28 text-sm text-muted">Please login to view profile.</section>;
  }

  await connectToDatabase();
  const profile = await UserModel.findById(user.id).select("-passwordHash").lean();

  return (
    <section className="mx-auto max-w-3xl px-4 pb-14 pt-24 md:pt-28">
      <h1 className="heading-lg mb-5">My Profile</h1>
      <div className="luxury-card space-y-3 p-6 text-sm">
        <p>Name: {profile?.name}</p>
        <p>Email: {profile?.email}</p>
        <p>Phone: {profile?.phone || "-"}</p>
        <p>Role: {profile?.role}</p>
      </div>
    </section>
  );
}
