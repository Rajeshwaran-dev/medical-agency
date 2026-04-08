const Product = require("../models/Product");
const Category = require("../models/Category");
const Offer = require("../models/Offer");
const asyncHandler = require("../utils/asyncHandler");

const getDashboardStats = asyncHandler(async (req, res) => {
  const [totalProducts, totalCategories, totalOffers] = await Promise.all([
    Product.countDocuments(),
    Category.countDocuments(),
    Offer.countDocuments()
  ]);

  res.json({
    success: true,
    data: { totalProducts, totalCategories, totalOffers }
  });
});

module.exports = { getDashboardStats };
