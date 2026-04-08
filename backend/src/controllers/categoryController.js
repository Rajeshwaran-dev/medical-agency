const Category = require("../models/Category");
const Product = require("../models/Product");
const asyncHandler = require("../utils/asyncHandler");

const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find().sort({ createdAt: -1 });
  res.json({ success: true, count: categories.length, data: categories });
});

const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400);
    throw new Error("Category name is required");
  }
  const category = await Category.create({ name: name.trim() });
  res.status(201).json({ success: true, data: category });
});

const updateCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const category = await Category.findById(req.params.id);
  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }
  category.name = name?.trim() || category.name;
  await category.save();
  res.json({ success: true, data: category });
});

const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }

  const usedInProducts = await Product.countDocuments({ category: category._id });
  if (usedInProducts > 0) {
    res.status(400);
    throw new Error("Cannot delete category used by products");
  }

  await category.deleteOne();
  res.json({ success: true, message: "Category deleted successfully" });
});

module.exports = { getCategories, createCategory, updateCategory, deleteCategory };
