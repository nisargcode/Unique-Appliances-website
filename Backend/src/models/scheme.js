import mongoose, { Schema } from "mongoose";

const SchemeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    image: {
      url: { type: String, required: true },
      publicId: { type: String, required: true },
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export const Scheme = mongoose.model("Scheme", SchemeSchema);
