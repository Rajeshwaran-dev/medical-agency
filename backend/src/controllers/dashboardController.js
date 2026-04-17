const Product = require("../models/Product");
const Category = require("../models/Category");
const Offer = require("../models/Offer");
const Lead = require("../models/Lead");
const asyncHandler = require("../utils/asyncHandler");

const getDashboardStats = asyncHandler(async (req, res) => {
  const [totalProducts, totalCategories, totalOffers, totalLeads] =
    await Promise.all([
      Product.countDocuments(),
      Category.countDocuments(),
      Offer.countDocuments(),
      Lead.countDocuments(),
    ]);

  res.json({
    success: true,
    data: { totalProducts, totalCategories, totalOffers, totalLeads },
  });
});

module.exports = { getDashboardStats };
