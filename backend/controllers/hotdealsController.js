import asyncHandler from "express-async-handler";
import HotDeal from "../models/hotdealsModel.js";
import Product from "../models/productModel.js";
import cloudinary from "cloudinary";

// @desc    Fetch all hotdeal
// @route   GET /api/hotdeal
// @access  Public
const getHotDeal = asyncHandler(async (req, res) => {
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
  // { ...keyword }
  const count = await HotDeal.countDocuments({ ...keyword });
  const homecategories = await HotDeal.find({ ...keyword }).populate([
    "categories"
  ]);

  const hotdealPromises = homecategories.map(hotdeal => {
    let cat = hotdeal.toObject();
    return new Promise(resolve => {
      if (cat.parent) {
        HotDeal.findById(cat.parent)
          .exec()
          .then(c => {
            cat.parent = c;
            resolve(cat);
          });
      } else {
        resolve(cat);
      }
    });
  });
  Promise.all(hotdealPromises).then(promises => {
    // res.json(promises)
    // res.json({ homecategories: promises, page, pages: Math.ceil(count / pageSize) })
    res.json(promises);
  });
  // res.json(homecategories)

  // res.json({ homecategories, page, pages: Math.ceil(count / pageSize) })
});

const getHotDealById = asyncHandler(async (req, res) => {
  const hotdeal = await HotDeal.find({
    _id: { $in: req.params.id.split(",") }
  }).populate(["categories"]);

  if (hotdeal) {
    if (hotdeal.length == 1) {
      res.json(hotdeal[0]);
    } else {
      res.json(hotdeal);
    }
  } else {
    res.status(404);
    throw new Error("hotdeal not found");
  }
});

const getAllHotDeal = asyncHandler(async (req, res) => {
  const hotdeal = await await HotDeal.find();

  if (hotdeal) {
    res.json(hotdeal);
  } else {
    res.status(404);
    throw new Error("HotDeal not found");
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteHotDeal = asyncHandler(async (req, res) => {
  const hotdeal = await HotDeal.findById(req.params.id);

  if (hotdeal) {
    await hotdeal.remove();
    res.json({ message: "HotDeal removed" });
  } else {
    res.status(404);
    throw new Error("HotDeal not found");
  }
});

// @desc    Create a hotdeal
// @route   POST /api/hotdeal
// @access  Private/Admin
const createHotDeal = asyncHandler(async (req, res) => {
  const hotdeal = new HotDeal(req.body);
  const categoryPromise = req.body.categories.map(category => category.value);
  const data = await Promise.all([categoryPromise]);
  hotdeal.categories = data[0];

  const { title, slug, active } = req.body;
  cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
  });

  let uploadeResponse = await cloudinary.v2.uploader.upload(req.body.image);
  const image = uploadeResponse.secure_url;
  const createdHotDeal = await hotdeal.save();

  res.status(201).json(createdHotDeal);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateHotDeal = asyncHandler(async (req, res) => {
  cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
  });

  let uploadeResponse = await cloudinary.v2.uploader.upload(req.body.image);
  const image = uploadeResponse.secure_url;
  const { active, fromdate, todate } = req.body;
  const hotdeal = await HotDeal.findById(req.params.id);
  const categoryPromise = req.body.categories.map(category => category.id);
  const data = await Promise.all([categoryPromise]);
  hotdeal.categories = data[0];
  if (hotdeal) {
    hotdeal.active = active;
    hotdeal.fromdate = fromdate;
    hotdeal.todate = todate;
    hotdeal.image = image;
    const updatedHotDeal = await hotdeal.save();
    res.json(updatedHotDeal);
  } else {
    res.status(404);
    throw new Error("HotDeal not found");
  }
});

export {
  getHotDeal,
  getHotDealById,
  deleteHotDeal,
  createHotDeal,
  updateHotDeal,
  getAllHotDeal
};
