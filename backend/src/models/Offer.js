const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    discountPercentage: { type: Number, required: true, min: 0, max: 100 }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Offer", offerSchema);
