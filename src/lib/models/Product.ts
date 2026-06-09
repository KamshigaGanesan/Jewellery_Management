import { Schema, model, models, type InferSchemaType } from "mongoose";

const mediaSchema = new Schema(
  {
    url: { type: String, required: true },
    type: { type: String, enum: ["image", "video"], default: "image" },
  },
  { _id: false },
);

const productSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    tags: [{ type: String }],
    media: [mediaSchema],
    goldPurity: { type: String, default: "22K" },
    weightInGrams: { type: Number, required: true },
    makingCharge: { type: Number, default: 0 },
    wastagePercent: { type: Number, default: 0 },
    estimatedPrice: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    isAvailable: { type: Boolean, default: true },
    isTrending: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export type ProductDocument = InferSchemaType<typeof productSchema> & { _id: string };

export const ProductModel = models.Product || model("Product", productSchema);
