import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { requireAdmin } from "@/lib/api-auth";
import {
  AppointmentModel,
  CustomOrderModel,
  OrderModel,
  ProductModel,
  UserModel,
} from "@/lib/models";

export async function GET() {
  const auth = await requireAdmin();
  if (auth.error) return auth.error;

  await connectToDatabase();
  const [ordersCount, inquiriesCount, revenueAgg, appointmentsCount, productsCount, usersCount] =
    await Promise.all([
      OrderModel.countDocuments(),
      CustomOrderModel.countDocuments(),
      OrderModel.aggregate([{ $group: { _id: null, total: { $sum: "$total" } } }]),
      AppointmentModel.countDocuments(),
      ProductModel.countDocuments(),
      UserModel.countDocuments(),
    ]);

  return NextResponse.json({
    stats: {
      totalOrders: ordersCount,
      totalInquiries: inquiriesCount,
      revenue: revenueAgg[0]?.total ?? 0,
      appointments: appointmentsCount,
      products: productsCount,
      users: usersCount,
    },
  });
}
