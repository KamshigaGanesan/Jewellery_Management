import { Schema, model, models, type InferSchemaType } from "mongoose";

const appointmentSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    mode: { type: String, enum: ["showroom", "video-call"], required: true },
    occasion: { type: String, default: "bridal consultation" },
    notes: { type: String, default: "" },
    status: {
      type: String,
      enum: ["pending", "approved", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true },
);

export type AppointmentDocument = InferSchemaType<typeof appointmentSchema> & { _id: string };

export const AppointmentModel = models.Appointment || model("Appointment", appointmentSchema);
