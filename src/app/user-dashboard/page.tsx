import { getCurrentUserFromCookie } from "@/lib/api-auth";
import { connectToDatabase } from "@/lib/db";
import { AppointmentModel, CustomOrderModel, WishlistModel } from "@/lib/models";

export const dynamic = "force-dynamic";

export default async function UserDashboardPage() {
  const user = await getCurrentUserFromCookie();
  if (!user) {
    return (
      <section className="mx-auto max-w-xl px-4 pb-14 pt-24 md:pt-28">
        <p className="text-muted">Please login to access your dashboard.</p>
      </section>
    );
  }

  await connectToDatabase();
  const [appointments, orders, wishlist] = await Promise.all([
    AppointmentModel.find({ user: user.id }).sort({ createdAt: -1 }).limit(5).lean(),
    CustomOrderModel.find({ user: user.id }).sort({ createdAt: -1 }).limit(5).lean(),
    WishlistModel.findOne({ user: user.id }).populate("products").lean(),
  ]);

  return (
    <section className="mx-auto max-w-7xl px-4 pb-14 pt-24 md:px-8 md:pt-28">
      <h1 className="heading-lg">My Dashboard</h1>
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="luxury-card p-5">
          <h2 className="font-semibold">Appointments</h2>
          <div className="mt-3 space-y-2 text-sm">
            {appointments.map((item) => (
              <p key={String(item._id)}>{item.date} {item.time} · {item.status}</p>
            ))}
          </div>
        </div>
        <div className="luxury-card p-5">
          <h2 className="font-semibold">Custom Orders</h2>
          <div className="mt-3 space-y-2 text-sm">
            {orders.map((item) => (
              <p key={String(item._id)}>Budget Rs. {item.budget} · {item.status}</p>
            ))}
          </div>
        </div>
        <div className="luxury-card p-5">
          <h2 className="font-semibold">Wishlist</h2>
          <div className="mt-3 space-y-2 text-sm">
            {(wishlist?.products as { _id: string; name: string }[] | undefined)?.map((item) => (
              <p key={String(item._id)}>{item.name}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
