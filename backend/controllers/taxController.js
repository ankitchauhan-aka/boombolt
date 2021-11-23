import asyncHandler from "express-async-handler";
import Tax from "../models/taxModel.js";

// @desc    Fetch all tax
// @route   GET /api/tax
// @access  Public
const getTax = asyncHandler(async (req, res) => {
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

  const taxs = await Tax.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json(taxs);
});

// @desc    Fetch single tax
// @route   GET /api/tax/:id
// @access  Public
const getTaxById = asyncHandler(async (req, res) => {
  const tax = await Tax.findById(req.params.id);
  if (tax) {
    res.json(tax);
  } else {
    res.status(404);
    throw new Error("Tax not found");
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteTax = asyncHandler(async (req, res) => {
  const tax = await Tax.findById(req.params.id);

  if (tax) {
    await tax.remove();
    res.json({ message: "Tax removed" });
  } else {
    res.status(404);
    throw new Error("Tax not found");
  }
});

// @desc    Create a tax
// @route   POST /api/tax
// @access  Private/Admin
const createTax = asyncHandler(async (req, res) => {
  try {
    const { tax, home_include, active } = req.body;
    const taxdata = new Tax({ tax, active, home_include });
    const createdTax = await taxdata.save();
    res.status(201).json(createdTax);
  } catch (err) {
    console.log(err);
  }
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateTax = asyncHandler(async (req, res) => {
  const { tax, active, home_include } = req.body;

  const taxdata = await Tax.findById(req.params.id);

  if (taxdata) {
    taxdata.tax = tax;
    taxdata.active = active;
    taxdata.home_include = home_include;
    const updatedTax = await taxdata.save();
    res.json(updatedTax);
  } else {
    res.status(404);
    throw new Error("Tax not found");
  }
});

export { getTax, getTaxById, deleteTax, createTax, updateTax };
