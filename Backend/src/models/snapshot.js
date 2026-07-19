import mongoose, { Schema } from "mongoose";

const snapshotSchema = new Schema(
  {
    image: {
      url: { type: String, required: true },
      publicId: { type: String, required: true },
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      required: true,
    },

    description: {
      type: String,
    },
  },
  { timestamps: true },
);

export const Snapshot = mongoose.model("Snapshot", snapshotSchema);
