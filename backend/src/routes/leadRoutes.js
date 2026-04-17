const express = require("express");
const {
  createLeadFromWebsite,
  createLeadManually,
  getLeads,
  getLeadById,
  updateLead,
  deleteLead,
} = require("../controllers/leadController");
const { protect, adminOnly } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", createLeadFromWebsite);
router.post("/manual", protect, adminOnly, createLeadManually);
router.get("/", protect, adminOnly, getLeads);
router.get("/:id", protect, adminOnly, getLeadById);
router.put("/:id", protect, adminOnly, updateLead);
router.delete("/:id", protect, adminOnly, deleteLead);

module.exports = router;
