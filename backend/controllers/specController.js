import asyncHandler from "express-async-handler";
import Specs from "../models/specModel.js";
import cloudinary from "cloudinary";

// @desc    Fetch all specs
// @route   GET /api/specs
// @access  Public
const getSpecs = asyncHandler(async (req, res) => {
  const pageSize = 100;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i"
        }
      }
    : {};

  const count = await Specs.countDocuments({ ...keyword });
  const specs = await Specs.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  // res.json({ specs, page, pages: Math.ceil(count / pageSize) })
  res.json(specs);
});

// @desc    Fetch single specs
// @route   GET /api/specs/:id
// @access  Public
const getSpecsById = asyncHandler(async (req, res) => {
  const specs = await Specs.findById(req.params.id);

  if (specs) {
    res.json(specs);
  } else {
    res.status(404);
    throw new Error("Specs not found");
  }
});

// @desc    Fetch home specs
// @route   GET /api/specs/:id
// @access  Public
const getHomeSpecs = asyncHandler(async (req, res) => {
  const specs = await Specs.find({ home_include: true });

  if (specs) {
    res.json(specs);
  } else {
    res.status(404);
    throw new Error("Specs not found");
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteSpecs = asyncHandler(async (req, res) => {
  const specs = await Specs.findById(req.params.id);

  if (specs) {
    await specs.remove();
    res.json({ message: "Specs removed" });
  } else {
    res.status(404);
    throw new Error("Specs not found");
  }
});

// @desc    Create a specs
// @route   POST /api/specs
// @access  Private/Admin
const createSpecs = asyncHandler(async (req, res) => {
  try {
    const { title, attrs } = req.body;
    const specs = new Specs({ title, attrs });

    const createdSpecs = await specs.save();
    res.status(201).json(createdSpecs);
  } catch (err) {
    console.log(err);
  }
});

// @desc    Create custom specs
// @route   POST /api/specs/createCustom
// @access  Private/Admin
const createCustomSpecs = asyncHandler(async (req, res) => {
  try {
    const title = "Software Networking";
    const attrs = [
      { value: "Product Description" },
      { value: "License Qty" },
      { value: "Product Type" },
      { value: "Category" },
      { value: "Service & Support" },
      { value: "Platform" },
      { value: "Bundled Support" },
      { value: "Licensing Details" },
      { value: "Upgrade from" },
      { value: "License Pricing" },
      { value: "Licensing Program" },
      { value: "Version" },
      { value: "Full Contract Period" },
      { value: "Software Title" },
      { value: "Service Included" },
      { value: "Service Availability" },
      { value: "Designed For" },
      { value: "Installation Type" },
      { value: "Response Time" },
      { value: "License Type" },
      { value: "Hardware Pricing" },
      { value: "Language" },
      { value: "Type" },
      { value: "Distribution Media" },
      { value: "Bundled with" },
      { value: "Location" },
      { value: "Operating System" },
      { value: "Color" },
      { value: "Manufacturer Warranty" },
      { value: "Device Type" },
      { value: "Dimensions (WxDxH)" },
      { value: "Length" },
      { value: "Connector" },
      { value: "Connector (Second End)" },
      { value: "Features" }
    ];
    const specs = new Specs({ title, attrs });

    // const created = await specs.save();
    // res.json(created);

    const createdSpecs = await specs.save();
    res.status(201).json(createdSpecs);
  } catch (err) {
    console.log(err);
  }
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateSpecs = asyncHandler(async (req, res) => {
  const { title, attrs } = req.body;

  const specs = await Specs.findById(req.params.id);

  if (specs) {
    specs.title = title;
    specs.attrs = attrs;

    const updatedSpecs = await specs.save();
    res.json(updatedSpecs);
  } else {
    res.status(404);
    throw new Error("Specs not found");
  }
});

export {
  getSpecs,
  getSpecsById,
  deleteSpecs,
  createSpecs,
  updateSpecs,
  getHomeSpecs,
  createCustomSpecs
};
