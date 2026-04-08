const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    price: { type: Number, required: true, min: 0 },
    offer: { type: mongoose.Schema.Types.ObjectId, ref: "Offer", default: null },
    image: { type: String, default: "" },
    description: { type: String, required: true, trim: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
