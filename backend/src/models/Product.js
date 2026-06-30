const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    price: { type: Number, min: 0, default: 0 },
    image: { type: String, default: "" },
    images: { type: [String], default: [] },
    specs: [
      {
        label: { type: String, trim: true, default: "" },
        value: { type: String, trim: true, default: "" }
      }
    ],
    description: { type: String, required: true, trim: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
