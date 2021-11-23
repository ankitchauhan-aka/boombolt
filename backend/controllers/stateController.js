import asyncHandler from "express-async-handler";
import State from "../models/stateModel.js";

// @desc    Fetch all state
// @route   GET /api/state
// @access  Public
const getState = asyncHandler(async (req, res) => {
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

  const states = await State.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json(states);
});

// @desc    Fetch single state
// @route   GET /api/state/:id
// @access  Public
const getStateById = asyncHandler(async (req, res) => {
  const state = await State.findById(req.params.id);

  if (state) {
    res.json(state);
  } else {
    res.status(404);
    throw new Error("State not found");
  }
});

const getZipcodeState = asyncHandler(async (req, res) => {
  var Zipcode = req.params.id;

  const state = await State.findOne({ ZipCode: Number(Zipcode) });

  if (state) {
    var taxRate = state.state_rate * 100;
    var statData = {
      active: state.active,
      _id: state._id,
      title: state.title,
      tax_region: state.tax_region,
      ZipCode: state,
      state_rate: taxRate,
      shipping_charge: state.shipping_charge,
      id: state.id,
    };
    res.json(statData);
  } else {
    res.status(401);
    throw new Error("State not found");
  }
});

// @desc    Fetch home states
// @route   GET /api/state/:id
// @access  Public
const getHomeState = asyncHandler(async (req, res) => {
  const state = await State.find({ home_include: true });

  if (state) {
    res.json(state);
  } else {
    res.status(404);
    throw new Error("State not found");
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteState = asyncHandler(async (req, res) => {
  const state = await State.findById(req.params.id);

  if (state) {
    await state.remove();
    res.json({ message: "State removed" });
  } else {
    res.status(404);
    throw new Error("State not found");
  }
});

// @desc    Create a state
// @route   POST /api/state
// @access  Private/Admin
const createState = asyncHandler(async (req, res) => {
  try {
    const {
      title,
      tax_region,
      zipCode,
      shipping_charge,
      active,
      state_rate,
    } = req.body;
    const state = new State({
      title,
      tax_region,
      zipCode,
      shipping_charge,
      active,
      state_rate,
    });
    const createdState = await state.save();
    res.status(201).json(createdState);
  } catch (err) {
    console.log(err);
  }
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateState = asyncHandler(async (req, res) => {
  const {
    title,
    tax_region,
    zipCode,
    shipping_charge,
    active,
    state_rate,
  } = req.body;

  const state = await State.findById(req.params.id);

  if (state) {
    state.title = title;
    state.tax_region = tax_region;
    state.zipCode = zipCode;
    state.state_rate = state_rate;
    state.shipping_charge = shipping_charge;
    state.active = active;
    const updatedState = await state.save();
    res.json(updatedState);
  } else {
    res.status(404);
    throw new Error("State not found");
  }
});

export {
  getState,
  getStateById,
  deleteState,
  createState,
  updateState,
  getHomeState,
  getZipcodeState,
};
