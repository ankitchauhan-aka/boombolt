import asyncHandler from "express-async-handler";
import Coupon from "../models/couponModel.js";

// @desc    Fetch all coupon
// @route   GET /api/coupon
// @access  Public
const getCoupon = asyncHandler(async (req, res) => {
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

  const count = await Coupon.countDocuments({ ...keyword });
  const coupons = await Coupon.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  // res.json({ coupons, page, pages: Math.ceil(count / pageSize) })
  res.json(coupons);
});

// @desc    Fetch single coupon
// @route   GET /api/coupon/:id
// @access  Public
const getCouponById = asyncHandler(async (req, res) => {
  const coupon = await Coupon.findById(req.params.id);

  if (coupon) {
    res.json(coupon);
  } else {
    res.status(404);
    throw new Error("Coupon not found");
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteCoupon = asyncHandler(async (req, res) => {
  const coupon = await Coupon.findById(req.params.id);

  if (coupon) {
    await coupon.remove();
    res.json({ message: "Coupon removed" });
  } else {
    res.status(404);
    throw new Error("Coupon not found");
  }
});

// @desc    Create a coupon
// @route   POST /api/coupon
// @access  Private/Admin
const createCoupon = asyncHandler(async (req, res) => {
  const { title, desc, total, coupon_type, weightage, active } = req.body;
  const coupon = new Coupon({
    title,
    desc,
    total,
    coupon_type,
    weightage,
    active,
  });

  const createdCoupon = await coupon.save();
  res.status(201).json(createdCoupon);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateCoupon = asyncHandler(async (req, res) => {
  const { title, desc, total, coupon_type, weightage, active } = req.body;

  const coupon = await Coupon.findById(req.params.id);

  if (coupon) {
    coupon.title = title;
    coupon.desc = desc;
    coupon.total = total;
    coupon.coupon_type = coupon_type;
    coupon.weightage = weightage;
    coupon.active = active;
    const updatedCoupon = await coupon.save();
    res.json(updatedCoupon);
  } else {
    res.status(404);
    throw new Error("Coupon not found");
  }
});

const getCouponDetails = asyncHandler(async (req, res) => {
  const coupon = await Coupon.findOne({ title: req.params.coupon });

  if (coupon) {
    if (coupon.total > coupon.used) {
      res.json(coupon);
    }
  } else {
    res.status(404);
    throw new Error("Coupon not found");
  }
});

export {
  getCoupon,
  getCouponById,
  deleteCoupon,
  createCoupon,
  updateCoupon,
  getCouponDetails,
};
