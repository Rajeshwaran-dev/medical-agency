const Product = require("../models/Product");
const Category = require("../models/Category");
const asyncHandler = require("../utils/asyncHandler");
const { uploadImageBuffer } = require("../services/cloudinaryService");

const parseSpecs = (specsRaw) => {
  if (!specsRaw) return [];

  let parsed = specsRaw;
  if (typeof specsRaw === "string") {
    try {
      parsed = JSON.parse(specsRaw);
    } catch (error) {
      return [];
    }
  }

  if (!Array.isArray(parsed)) return [];

  return parsed
    .map((item) => ({
      label: String(item?.label || "").trim(),
      value: String(item?.value || "").trim()
    }))
    .filter((item) => item.label && item.value);
};

const parseNumericPrice = (value) => {
  if (value === undefined || value === null || value === "") return null;
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 0) return null;
  return parsed;
};

const normalizeProductPayload = (doc) => {
  const data = doc.toObject ? doc.toObject() : doc;
  const normalizedImages = Array.isArray(data.images) && data.images.length > 0
    ? data.images
    : data.image
      ? [data.image]
      : [];
  return {
    ...data,
    images: normalizedImages,
    image: data.image || normalizedImages[0] || "",
    specs: Array.isArray(data.specs) ? data.specs : []
  };
};

const getProducts = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const search = req.query.search || "";
  const category = req.query.category || "";

  const query = {
    name: { $regex: search, $options: "i" }
  };

  if (category) query.category = category;

  const total = await Product.countDocuments(query);
  const products = await Product.find(query)
    .populate("category", "name")
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  res.json({
    success: true,
    data: products.map(normalizeProductPayload),
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
    .populate("category", "name");

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.json({ success: true, data: normalizeProductPayload(product) });
});

const createProduct = asyncHandler(async (req, res) => {
  const { name, category, description, specs } = req.body;

  if (!name || !category || !description) {
    res.status(400);
    throw new Error("Name, category and description are required");
  }

  const categoryExists = await Category.findById(category);
  if (!categoryExists) {
    res.status(400);
    throw new Error("Invalid category");
  }

  const uploadedImages = [];
  if (Array.isArray(req.files) && req.files.length > 0) {
    for (const file of req.files) {
      const cloudinaryResult = await uploadImageBuffer(file.buffer);
      uploadedImages.push(cloudinaryResult.secure_url);
    }
  }

  const parsedSpecs = parseSpecs(specs);

  const product = await Product.create({
    name: name.trim(),
    category,
    image: uploadedImages[0] || "",
    images: uploadedImages,
    specs: parsedSpecs,
    description: description.trim()
  });

  const populated = await Product.findById(product._id)
    .populate("category", "name");

  res.status(201).json({ success: true, data: normalizeProductPayload(populated) });
});

const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  const { name, category, description, specs } = req.body;

  if (category) {
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      res.status(400);
      throw new Error("Invalid category");
    }
  }

  if (Array.isArray(req.files) && req.files.length > 0) {
    const uploadedImages = [];
    for (const file of req.files) {
      const cloudinaryResult = await uploadImageBuffer(file.buffer);
      uploadedImages.push(cloudinaryResult.secure_url);
    }
    product.images = uploadedImages;
    product.image = uploadedImages[0] || "";
  }

  if (specs !== undefined) {
    product.specs = parseSpecs(specs);
  }

  product.name = name?.trim() || product.name;
  product.category = category || product.category;
  product.description = description?.trim() || product.description;

  if ((!product.images || product.images.length === 0) && product.image) {
    product.images = [product.image];
  }
  if ((!product.image || product.image.length === 0) && product.images?.length) {
    product.image = product.images[0];
  }

  await product.save();

  const populated = await Product.findById(product._id)
    .populate("category", "name");

  res.json({ success: true, data: normalizeProductPayload(populated) });
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
