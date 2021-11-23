import asyncHandler from "express-async-handler";
import HomeCategory from "../models/homecategoryModel.js";
import Product from "../models/productModel.js";
import cloudinary from "cloudinary";

// @desc    Fetch all homecategory
// @route   GET /api/homecategory
// @access  Public
const getHomeCategory = asyncHandler(async (req, res) => {
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
  const count = await HomeCategory.countDocuments({ ...keyword });
  const homecategories = await HomeCategory.find({ ...keyword }).populate([
    "categories"
  ]);
  // .limit(pageSize)
  // .skip(pageSize * (page - 1));

  const homecategoryPromises = homecategories.map(homecategory => {
    let cat = homecategory.toObject();
    return new Promise(resolve => {
      if (cat.parent) {
        HomeCategory.findById(cat.parent)
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
  Promise.all(homecategoryPromises).then(promises => {
    // res.json(promises)
    // res.json({ homecategories: promises, page, pages: Math.ceil(count / pageSize) })
    res.json(promises);
  });
  // res.json(homecategories)

  // res.json({ homecategories, page, pages: Math.ceil(count / pageSize) })
});

const getHomeCategoryById = asyncHandler(async (req, res) => {
  const homecategory = await HomeCategory.find({
    _id: { $in: req.params.id.split(",") }
  }).populate(["categories"]);

  if (homecategory) {
    if (homecategory.length == 1) {
      res.json(homecategory[0]);
    } else {
      res.json(homecategory);
    }
  } else {
    res.status(404);
    throw new Error("homecategory not found");
  }
});

const getAllHomeCategory = asyncHandler(async (req, res) => {
  const homecategory = await await HomeCategory.find();

  if (homecategory) {
    res.json(homecategory);
  } else {
    res.status(404);
    throw new Error("HomeCategory not found");
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteHomeCategory = asyncHandler(async (req, res) => {
  const homecategory = await HomeCategory.findById(req.params.id);

  if (homecategory) {
    await homecategory.remove();
    res.json({ message: "HomeCategory removed" });
  } else {
    res.status(404);
    throw new Error("HomeCategory not found");
  }
});

// @desc    Create a homecategory
// @route   POST /api/homecategory
// @access  Private/Admin
const createHomeCategory = asyncHandler(async (req, res) => {
  const homecategory = new HomeCategory(req.body);
  const categoryPromise = req.body.categories.map(category => category.value);
  const data = await Promise.all([categoryPromise]);
  homecategory.categories = data[0];

  const { title, slug, active } = req.body;
  cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
  });

  let uploadeResponse = await cloudinary.v2.uploader.upload(req.body.image);
  const image = uploadeResponse.secure_url;
  const createdHomeCategory = await homecategory.save();

  res.status(201).json(createdHomeCategory);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateHomeCategory = asyncHandler(async (req, res) => {
  cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
  });

  let uploadeResponse = await cloudinary.v2.uploader.upload(req.body.image);
  const image = uploadeResponse.secure_url;
  const { title, parent, slug, nav_include, home_include, active } = req.body;
  const homecategory = await HomeCategory.findById(req.params.id);

  if (homecategory) {
    homecategory.title = title;
    homecategory.parent = parent;
    homecategory.slug = slug;
    homecategory.image = image;
    homecategory.nav_include = nav_include;
    homecategory.home_include = home_include;
    homecategory.active = active;
    const updatedHomeCategory = await homecategory.save();
    res.json(updatedHomeCategory);
  } else {
    res.status(404);
    throw new Error("HomeCategory not found");
  }
});

export {
  getHomeCategory,
  getHomeCategoryById,
  deleteHomeCategory,
  createHomeCategory,
  updateHomeCategory,
  getAllHomeCategory
};
