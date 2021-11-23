import asyncHandler from "express-async-handler";
import Color from "../models/colorModel.js";

// @desc    Fetch all color
// @route   GET /api/color
// @access  Public
const getColor = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  // const count = await Color.countDocuments({ ...keyword });
  const colors = await Color.find({ ...keyword });
  if (colors) {
    res.json(colors);
  } else {
    res.json("No Data Found");
  }
});

// @desc    Fetch single color
// @route   GET /api/color/:id
// @access  Public
const getColorById = asyncHandler(async (req, res) => {
  const color = await Color.findById(req.params.id);

  if (color) {
    res.json(color);
  } else {
    res.status(404);
    throw new Error("Color not found");
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteColor = asyncHandler(async (req, res) => {
  const color = await Color.findById(req.params.id);

  if (color) {
    await color.remove();
    res.json({ message: "Color removed" });
  } else {
    res.status(404);
    throw new Error("Color not found");
  }
});

// @desc    Create a color
// @route   POST /api/color
// @access  Private/Admin
const createColor = asyncHandler(async (req, res) => {
  const { title, colorcode } = req.body;
  const color = new Color({
    title,
    colorcode,
  });

  const createdColor = await color.save();
  res.status(201).json(createdColor);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateColor = asyncHandler(async (req, res) => {
  const { title, colorcode } = req.body;

  const color = await Color.findById(req.params.id);

  if (color) {
    color.title = title;
    color.colorcode = colorcode;

    const updatedColor = await color.save();
    res.json(updatedColor);
  } else {
    res.status(404);
    throw new Error("Color not found");
  }
});

const getColorDetails = asyncHandler(async (req, res) => {
  const color = await Color.findOne({ title: req.params.color });

  if (color) {
    res.json(color);
  } else {
    res.status(404);
    throw new Error("Color not found");
  }
});

export {
  getColor,
  getColorById,
  deleteColor,
  createColor,
  updateColor,
  getColorDetails,
};
