const Product = require("../models/Product");
const Category = require("../models/Category");
const Offer = require("../models/Offer");
const asyncHandler = require("../utils/asyncHandler");
const { uploadImageBuffer } = require("../services/cloudinaryService");

const getProducts = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const search = req.query.search || "";
  const category = req.query.category || "";
  const offer = req.query.offer || "";

  const query = {
    name: { $regex: search, $options: "i" }
  };

  if (category) query.category = category;
  if (offer) query.offer = offer;

  const total = await Product.countDocuments(query);
  const products = await Product.find(query)
    .populate("category", "name")
    .populate("offer", "title discountPercentage")
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  res.json({
    success: true,
    data: products,
    pagination: {
      total,
      page,
      pages: Math.ceil(total / limit),
      limit
    }
  });
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
    .populate("category", "name")
    .populate("offer", "title discountPercentage");

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.json({ success: true, data: product });
});

const createProduct = asyncHandler(async (req, res) => {
  const { name, category, price, offer, description } = req.body;

  if (!name || !category || price === undefined || !description) {
    res.status(400);
    throw new Error("Name, category, price and description are required");
  }

  const categoryExists = await Category.findById(category);
  if (!categoryExists) {
    res.status(400);
    throw new Error("Invalid category");
  }

  if (offer) {
    const offerExists = await Offer.findById(offer);
    if (!offerExists) {
      res.status(400);
      throw new Error("Invalid offer");
    }
  }

  let imageUrl = "";
  if (req.file?.buffer) {
    const cloudinaryResult = await uploadImageBuffer(req.file.buffer);
    imageUrl = cloudinaryResult.secure_url;
  }

  const product = await Product.create({
    name: name.trim(),
    category,
    price,
    offer: offer || null,
    image: imageUrl,
    description: description.trim()
  });

  const populated = await Product.findById(product._id)
    .populate("category", "name")
    .populate("offer", "title discountPercentage");

  res.status(201).json({ success: true, data: populated });
});

const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  const { name, category, price, offer, description } = req.body;

  if (category) {
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      res.status(400);
      throw new Error("Invalid category");
    }
  }

  if (offer) {
    const offerExists = await Offer.findById(offer);
    if (!offerExists) {
      res.status(400);
      throw new Error("Invalid offer");
    }
  }

  if (req.file?.buffer) {
    const cloudinaryResult = await uploadImageBuffer(req.file.buffer);
    product.image = cloudinaryResult.secure_url;
  }

  product.name = name?.trim() || product.name;
  product.category = category || product.category;
  product.price = price ?? product.price;
  product.offer = offer !== undefined ? offer || null : product.offer;
  product.description = description?.trim() || product.description;

  await product.save();

  const populated = await Product.findById(product._id)
    .populate("category", "name")
    .populate("offer", "title discountPercentage");

  res.json({ success: true, data: populated });
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  await product.deleteOne();
  res.json({ success: true, message: "Product deleted successfully" });
});

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
