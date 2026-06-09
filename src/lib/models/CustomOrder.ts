import { Schema, model, models, type InferSchemaType } from "mongoose";

const customOrderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    customerName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    budget: { type: Number, required: true },
    goldType: { type: String, enum: ["22K", "24K", "Silver"], required: true },
    description: { type: String, required: true },
    inspirationImage: { type: String, required: true },
    notes: { type: String, default: "" },
    status: {
      type: String,
      enum: ["new", "reviewing", "quoted", "approved", "rejected"],
      default: "new",
    },
    quotationAmount: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export type CustomOrderDocument = InferSchemaType<typeof customOrderSchema> & { _id: string };

export const CustomOrderModel = models.CustomOrder || model("CustomOrder", customOrderSchema);
