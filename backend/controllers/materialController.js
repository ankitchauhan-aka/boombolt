import asyncHandler from "express-async-handler";
import Material from "../models/materialModel.js";

// @desc    Fetch all bagsize
// @route   GET /api/bagsize
// @access  Public
const getMaterial = asyncHandler(async (req, res) => {
  const pageSize = 10;

  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i"
        }
      }
    : {};

  // const count = await Bagsize.countDocuments({ ...keyword });
  const materials = await Material.find({ ...keyword });
  // .limit(pageSize)
  // .skip(pageSize * (page - 1));
  if (materials) {
    res.json(materials);
  } else {
    res.json("No Data Found");
  }
});

// @desc    Fetch single bagsize
// @route   GET /api/bagsize/:id
// @access  Public
const getMaterialById = asyncHandler(async (req, res) => {
  const material = await Material.findById(req.params.id);

  if (material) {
    res.json(material);
  } else {
    res.status(404);
    throw new Error("Material not found");
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteMaterial = asyncHandler(async (req, res) => {
  const material = await Material.findById(req.params.id);

  if (material) {
    await material.remove();
    res.json({ message: "Material removed" });
  } else {
    res.status(404);
    throw new Error("Material not found");
  }
});

// @desc    Create a bagsize
// @route   POST /api/bagsize
// @access  Private/Admin
const createMaterial = asyncHandler(async (req, res) => {
  const { title, minsize, maxsize } = req.body;
  const material = new Material({
    title
  });

  const createdMaterial = await material.save();
  res.status(201).json(createdMaterial);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateMaterial = asyncHandler(async (req, res) => {
  const { title } = req.body;

  const material = await Material.findById(req.params.id);

  if (material) {
    material.title = title;
    // material.minsize = minsize;
    // material.maxsize = maxsize;

    const updatedMaterial = await material.save();
    res.json(updatedMaterial);
  } else {
    res.status(404);
    throw new Error("Material not found");
  }
});

const getMaterialDetails = asyncHandler(async (req, res) => {
  const material = await Material.findOne({ title: req.params.material });

  if (material) {
    res.json(material);
  } else {
    res.status(404);
    throw new Error("Material not found");
  }
});

export {
  getMaterial,
  getMaterialById,
  deleteMaterial,
  createMaterial,
  updateMaterial,
  getMaterialDetails
};
