import { Schema, model, models, type InferSchemaType } from "mongoose";

const goldRateSchema = new Schema(
  {
    type: { type: String, enum: ["22K", "24K", "Silver"], required: true },
    pricePerGram: { type: Number, required: true },
    recordedOn: { type: String, required: true },
    updatedBy: { type: String, default: "System" },
    previousPricePerGram: { type: Number, default: null },
    changeDirection: { type: String, enum: ["up", "down", "same"], default: "same" },
  },
  { timestamps: true },
);

goldRateSchema.index({ recordedOn: -1, type: 1 }, { unique: true });

export type GoldRateDocument = InferSchemaType<typeof goldRateSchema> & { _id: string };

export const GoldRateModel = models.GoldRate || model("GoldRate", goldRateSchema);
