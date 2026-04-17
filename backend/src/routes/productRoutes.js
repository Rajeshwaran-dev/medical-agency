const express = require("express");
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");
const { protect, adminOnly } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", protect, adminOnly, upload.array("images", 8), createProduct);
router.put("/:id", protect, adminOnly, upload.array("images", 8), updateProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);

module.exports = router;
