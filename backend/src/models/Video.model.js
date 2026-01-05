import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },

    filePath: { type: String, required: true },
    processedPath: String,

    duration: Number,
    size: Number,
    format: String,

    category: {
      type: String,
      default: "general"
    },

    status: {
      type: String,
      enum: ["uploaded", "processing", "safe", "flagged", "failed"],
      default: "uploaded"
    },

    sensitivityScore: Number,
    classification: {
      type: String,
      enum: ["safe", "flagged", "pending"],
      default: "pending"
    },

    tenantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tenant",
      required: true
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Video", videoSchema);
