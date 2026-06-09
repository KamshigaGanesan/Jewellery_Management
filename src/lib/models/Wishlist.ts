import { Schema, model, models, type InferSchemaType } from "mongoose";

const wishlistSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true },
);

export type WishlistDocument = InferSchemaType<typeof wishlistSchema> & { _id: string };

export const WishlistModel = models.Wishlist || model("Wishlist", wishlistSchema);
