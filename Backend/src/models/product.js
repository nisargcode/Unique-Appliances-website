import mongoose, { Schema } from "mongoose";
import { Category } from "./category.js";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    images: {
      type: [
        {
          url: { type: String, required: true },
          publicId: { type: String, required: true },
        },
      ],
      default: [],
    },
    rating: {
      type: Number,
    },
    badge: {
      type: String,
      enum: ["Popular", "New", "Best Seller"],
    },
  },
  { timestamps: true },
);

export const Product = mongoose.model("Product", productSchema);
