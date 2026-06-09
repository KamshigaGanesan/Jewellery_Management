import Link from "next/link";
import { requireAdmin } from "@/lib/api-auth";
import { connectToDatabase } from "@/lib/db";
import { AppointmentModel, CustomOrderModel, GoldRateModel, OrderModel, ProductModel, UserModel } from "@/lib/models";
import { summarizeGoldRates } from "@/lib/commerce";
import { GoldRateManager } from "@/components/admin/GoldRateManager";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const auth = await requireAdmin();
  if (auth.error || !auth.user) {
    return <section className="px-4 pt-28 text-sm text-muted">Admin login required.</section>;
  }
  await connectToDatabase();
  const [products, orders, customOrders, appointments, users, rates] = await Promise.all([
    ProductModel.find().sort({ createdAt: -1 }).limit(8).lean(),
    OrderModel.find().sort({ createdAt: -1 }).limit(8).lean(),
    CustomOrderModel.find().sort({ createdAt: -1 }).limit(8).lean(),
    AppointmentModel.find().sort({ createdAt: -1 }).limit(8).lean(),
    UserModel.find().select("-passwordHash").sort({ createdAt: -1 }).limit(10).lean(),
    GoldRateModel.find().sort({ recordedOn: -1, updatedAt: -1 }).limit(90).lean(),
  ]);
  const latestRates = summarizeGoldRates(rates as never[]).history.slice(0, 6);
  const latestRateDate = latestRates[0]?.recordedOn ?? null;

  return (
    <section className="mx-auto max-w-7xl px-4 pb-14 pt-24 md:px-8 md:pt-28">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.45em] text-gold/70">Admin Dashboard</p>
          <h1 className="heading-lg mt-2">Operations Control</h1>
        </div>
        <Link href="/" className="btn-outline-gold">
          Back to site
        </Link>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        <div className="luxury-card p-4"><p className="text-muted text-xs">Products</p><p className="mt-1 text-2xl font-semibold">{products.length}</p></div>
        <div className="luxury-card p-4"><p className="text-muted text-xs">Orders</p><p className="mt-1 text-2xl font-semibold">{orders.length}</p></div>
        <div className="luxury-card p-4"><p className="text-muted text-xs">Custom Orders</p><p className="mt-1 text-2xl font-semibold">{customOrders.length}</p></div>
        <div className="luxury-card p-4"><p className="text-muted text-xs">Appointments</p><p className="mt-1 text-2xl font-semibold">{appointments.length}</p></div>
        <div className="luxury-card p-4"><p className="text-muted text-xs">Users</p><p className="mt-1 text-2xl font-semibold">{users.length}</p></div>
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        <div className="luxury-card p-5">
          <h2 className="font-semibold">Recent Orders</h2>
          <div className="mt-3 space-y-2 text-sm">
            {orders.length === 0 ? <p className="text-muted">No orders yet.</p> : null}
            {orders.map((item) => (
              <p key={String(item._id)}>
                Rs. {item.total?.toLocaleString?.() ?? item.total} · {item.status}
              </p>
            ))}
          </div>
        </div>
        <div className="luxury-card p-5">
          <h2 className="font-semibold">Recent Custom Orders</h2>
          <div className="mt-3 space-y-2 text-sm">
            {customOrders.length === 0 ? <p className="text-muted">No custom orders yet.</p> : null}
            {customOrders.map((item) => (
              <p key={String(item._id)}>
                {item.customerName} · Rs. {item.budget} · {item.status}
              </p>
            ))}
          </div>
        </div>
        <div className="luxury-card p-5">
          <h2 className="font-semibold">Recent Appointments</h2>
          <div className="mt-3 space-y-2 text-sm">
            {appointments.length === 0 ? <p className="text-muted">No appointments yet.</p> : null}
            {appointments.map((item) => (
              <p key={String(item._id)}>
                {item.name} · {item.date} {item.time} · {item.status}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="luxury-card p-5">
          <h2 className="font-semibold">Gold Rate Updates</h2>
          <p className="text-muted mt-1 text-xs">Latest update: {latestRateDate ?? "No updates yet"}</p>
          <div className="mt-3 space-y-2 text-sm">
            {latestRates.length === 0 ? <p className="text-muted">No rate updates yet.</p> : null}
            {latestRates.map((rate) => (
              <p key={String(rate._id)}>
                {rate.recordedOn} · {rate.type} Rs. {rate.pricePerGram.toLocaleString()} · {rate.updatedBy || "Admin"}
              </p>
            ))}
          </div>
        </div>
      </div>
      <GoldRateManager />
    </section>
  );
}