const Product = require("../models/Product");
const Category = require("../models/Category");
const Lead = require("../models/Lead");
const asyncHandler = require("../utils/asyncHandler");

const getDashboardStats = asyncHandler(async (req, res) => {
  const [totalProducts, totalCategories, totalLeads] =
    await Promise.all([
      Product.countDocuments(),
      Category.countDocuments(),
      Lead.countDocuments(),
    ]);

  res.json({
    success: true,
    data: { totalProducts, totalCategories, totalLeads },
  });
});

module.exports = { getDashboardStats };
