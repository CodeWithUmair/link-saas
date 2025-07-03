import { model, models, Schema } from "mongoose";

const PageSchema = new Schema(
  {
    uri: { type: String, required: true, min: 1, unique: true },
    owner: { type: String, required: true, unique: true },

    // Basic info
    displayName: { type: String, default: "" },
    location: { type: String, default: "" },
    bio: { type: String, default: "" },

    // Background settings
    bgType: {
      type: String,
      enum: ["color", "image", "gradient"],
      default: "color",
    },
    bgColor: { type: String, default: "#000000" },         // solid
    bgImage: { type: String, default: "" },                 // image URL
    gradientType: {
      type: String,
      enum: ["linear", "radial"],
      default: "linear",
    },
    gradientColors: {
      type: [String],
      default: ["#000000", "#ffffff"],                     // must be length ≥2
    },

    // Layout style variant
    layoutVariant: {
      type: String,
      enum: ["default", "fullImage", "compact", "cards"],
      default: "default",
    },

    // Action buttons & link cards
    buttons: { type: Object, default: {} },
    links: { type: Array, default: [] },
  },
  { timestamps: true }
);

export const Page = models.Page || model("Page", PageSchema);
