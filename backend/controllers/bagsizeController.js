import asyncHandler from "express-async-handler";
import Bagsize from "../models/bagsizeModel.js";

// @desc    Fetch all bagsize
// @route   GET /api/bagsize
// @access  Public
const getBagsize = asyncHandler(async (req, res) => {
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

  const bagsizes = await Bagsize.find({ ...keyword });
  // .limit(pageSize)
  // .skip(pageSize * (page - 1));
  if (bagsizes) {
    res.json(bagsizes);
  } else {
    res.json("No Data Found");
  }
});

// @desc    Fetch single bagsize
// @route   GET /api/bagsize/:id
// @access  Public
const getBagsizeById = asyncHandler(async (req, res) => {
  const bagsize = await Bagsize.findById(req.params.id);

  if (bagsize) {
    res.json(bagsize);
  } else {
    res.status(404);
    throw new Error("Bagsize not found");
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteBagsize = asyncHandler(async (req, res) => {
  const bagsize = await Bagsize.findById(req.params.id);

  if (bagsize) {
    await bagsize.remove();
    res.json({ message: "Bagsize removed" });
  } else {
    res.status(404);
    throw new Error("Bagsize not found");
  }
});

// @desc    Create a bagsize
// @route   POST /api/bagsize
// @access  Private/Admin
const createBagsize = asyncHandler(async (req, res) => {
  const { title, minsize, maxsize } = req.body;
  const bagsize = new Bagsize({
    title,
    minsize,
    maxsize
  });

  const createdBagsize = await bagsize.save();
  res.status(201).json(createdBagsize);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateBagsize = asyncHandler(async (req, res) => {
  const { title, minsize, maxsize } = req.body;

  const bagsize = await Bagsize.findById(req.params.id);

  if (bagsize) {
    bagsize.title = title;
    bagsize.minsize = minsize;
    bagsize.maxsize = maxsize;

    const updatedBagsize = await bagsize.save();
    res.json(updatedBagsize);
  } else {
    res.status(404);
    throw new Error("Bagsize not found");
  }
});

const getBagsizeDetails = asyncHandler(async (req, res) => {
  const bagsize = await Bagsize.findOne({ title: req.params.bagsize });

  if (bagsize) {
    res.json(bagsize);
  } else {
    res.status(404);
    throw new Error("Bagsize not found");
  }
});

export {
  getBagsize,
  getBagsizeById,
  deleteBagsize,
  createBagsize,
  updateBagsize,
  getBagsizeDetails
};
