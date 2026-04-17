const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    organization: { type: String, trim: true, default: "" },
    subject: { type: String, trim: true, default: "" },
    message: { type: String, trim: true, default: "" },
    source: {
      type: String,
      enum: ["Website", "Manual", "Product"],
      default: "Website",
    },
    product: {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", default: null },
      name: { type: String, trim: true, default: "" },
      image: { type: String, trim: true, default: "" },
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Lead", leadSchema);
