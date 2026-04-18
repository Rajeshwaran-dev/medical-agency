const Lead = require("../models/Lead");
const Product = require("../models/Product");
const asyncHandler = require("../utils/asyncHandler");

/** Plain object + merge live product image/name when productId is populated */
function normalizeLeadPayload(lead) {
  const plain = lead.toObject ? lead.toObject() : { ...lead };
  const populated = plain.product?.productId;
  if (populated && typeof populated === "object" && populated._id) {
    const fromProduct =
      (Array.isArray(populated.images) && populated.images.length > 0
        ? populated.images[0]
        : "") ||
      populated.image ||
      "";
    const embeddedImg = (plain.product?.image && String(plain.product.image).trim()) || "";
    return {
      ...plain,
      product: {
        productId: populated._id,
        name: plain.product?.name || populated.name || "",
        image: embeddedImg || fromProduct || "",
      },
    };
  }
  return plain;
}

const createLeadFromWebsite = asyncHandler(async (req, res) => {
  const { name, email, phone, organization, subject, message, productId } = req.body;

  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("Name, email, and phone are required");
  }

  let source = "Website";
  let product = {
    productId: null,
    name: "",
    image: "",
  };

  if (productId) {
    const productDoc = await Product.findById(productId)
      .populate("category", "name")
      .populate("offer", "title discountPercentage");
    if (!productDoc) {
      res.status(400);
      throw new Error("Invalid product for enquiry");
    }
    source = "Product";
    const primaryImage =
      Array.isArray(productDoc.images) && productDoc.images.length > 0
        ? productDoc.images[0]
        : productDoc.image || "";
    product = {
      productId: productDoc._id,
      name: productDoc.name || "",
      image: primaryImage,
    };
  }

  const lead = await Lead.create({
    name,
    email,
    phone,
    organization: organization || "",
    subject: subject || "",
    message: message || "",
    source,
    product,
  });

  res.status(201).json({
    success: true,
    data: lead,
  });
});

const createLeadManually = asyncHandler(async (req, res) => {
  const { name, email, phone, organization, subject, message } = req.body;

  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("Name, email, and phone are required");
  }

  const lead = await Lead.create({
    name,
    email,
    phone,
    organization: organization || "",
    subject: subject || "",
    message: message || "",
    source: "Manual",
    product: {
      productId: null,
      name: "",
      image: "",
    },
  });

  res.status(201).json({
    success: true,
    data: lead,
  });
});

const getLeads = asyncHandler(async (req, res) => {
  const leads = await Lead.find()
    .sort({ createdAt: -1 })
    .populate({ path: "product.productId", select: "name image images" });
  const data = leads.map((doc) => normalizeLeadPayload(doc));
  res.json({ success: true, data });
});

const getLeadById = asyncHandler(async (req, res) => {
  const lead = await Lead.findById(req.params.id).populate({
    path: "product.productId",
    select: "name image images",
  });

  if (!lead) {
    res.status(404);
    throw new Error("Lead not found");
  }

  res.json({ success: true, data: normalizeLeadPayload(lead) });
});

const updateLead = asyncHandler(async (req, res) => {
  const lead = await Lead.findById(req.params.id);

  if (!lead) {
    res.status(404);
    throw new Error("Lead not found");
  }

  const { name, email, phone, organization, subject, message } = req.body;

  lead.name = name ?? lead.name;
  lead.email = email ?? lead.email;
  lead.phone = phone ?? lead.phone;
  lead.organization = organization ?? lead.organization;
  lead.subject = subject ?? lead.subject;
  lead.message = message ?? lead.message;

  const updatedLead = await lead.save();

  res.json({ success: true, data: updatedLead });
});

const deleteLead = asyncHandler(async (req, res) => {
  const lead = await Lead.findById(req.params.id);

  if (!lead) {
    res.status(404);
    throw new Error("Lead not found");
  }

  await Lead.deleteOne({ _id: lead._id });
  res.json({ success: true, message: "Lead deleted successfully" });
});

module.exports = {
  createLeadFromWebsite,
  createLeadManually,
  getLeads,
  getLeadById,
  updateLead,
  deleteLead,
};
