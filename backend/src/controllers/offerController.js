const Offer = require("../models/Offer");
const Product = require("../models/Product");
const asyncHandler = require("../utils/asyncHandler");

const getOffers = asyncHandler(async (req, res) => {
  const offers = await Offer.find().sort({ createdAt: -1 });
  res.json({ success: true, count: offers.length, data: offers });
});

const createOffer = asyncHandler(async (req, res) => {
  const { title, discountPercentage } = req.body;
  if (!title || discountPercentage === undefined) {
    res.status(400);
    throw new Error("Title and discount percentage are required");
  }

  const offer = await Offer.create({ title: title.trim(), discountPercentage });
  res.status(201).json({ success: true, data: offer });
});

const updateOffer = asyncHandler(async (req, res) => {
  const offer = await Offer.findById(req.params.id);
  if (!offer) {
    res.status(404);
    throw new Error("Offer not found");
  }

  offer.title = req.body.title?.trim() || offer.title;
  offer.discountPercentage =
    req.body.discountPercentage ?? offer.discountPercentage;
  await offer.save();

  res.json({ success: true, data: offer });
});

const deleteOffer = asyncHandler(async (req, res) => {
  const offer = await Offer.findById(req.params.id);
  if (!offer) {
    res.status(404);
    throw new Error("Offer not found");
  }

  await Product.updateMany({ offer: offer._id }, { $set: { offer: null } });
  await offer.deleteOne();

  res.json({ success: true, message: "Offer deleted successfully" });
});

module.exports = { getOffers, createOffer, updateOffer, deleteOffer };
