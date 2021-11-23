import asyncHandler from "express-async-handler";
import Category from "../models/categoryModel.js";
import Product from "../models/productModel.js";
import cloudinary from "cloudinary";

// @desc    Fetch all category
// @route   GET /api/category
// @access  Public
const getCategory = asyncHandler(async (req, res) => {
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
  // { ...keyword }
  const count = await Category.countDocuments({ ...keyword });
  const categories = await Category.find({ ...keyword });
  // .limit(pageSize)
  // .skip(pageSize * (page - 1));

  const categoryPromises = categories.map((category) => {
    let cat = category.toObject();
    return new Promise((resolve) => {
      if (cat.parent) {
        Category.findById(cat.parent)
          .exec()
          .then((c) => {
            cat.parent = c;
            resolve(cat);
          });
      } else {
        resolve(cat);
      }
    });
  });
  Promise.all(categoryPromises).then((promises) => {
    // res.json(promises)
    // res.json({ categories: promises, page, pages: Math.ceil(count / pageSize) })
    res.json(promises);
  });
  // res.json(categories)

  // res.json({ categories, page, pages: Math.ceil(count / pageSize) })
});

// @desc    Fetch all navbar category
// @route   GET /api/category/nav
// @access  Public
const getNavCategory = asyncHandler(async (req, res) => {
  const categories = await Category.find({
    nav_include: true,
    parent: "",
    active: true,
  }).limit(100);
  let finalCategories = [];
  for (let i = 0; i < categories.length; i++) {
    let category = categories[i].toObject();
    const childCategories = await Category.find({
      parent: categories[i]._id,
      nav_include: true,
      active: true,
    }).populate({ path: "products", match: { nav_include: true } });

    category.childCategories = childCategories;
    finalCategories.push(category);
  }
  res.json(finalCategories);
});

// @desc    Fetch single category
// @route   GET /api/category/:id
// @access  Public
const getCategoryById = asyncHandler(async (req, res) => {
  const category = await await Category.findById(req.params.id);

  if (category) {
    res.json(category);
  } else {
    res.status(404);
    throw new Error("Category not found");
  }
});

const getAllCategory = asyncHandler(async (req, res) => {
  const category = await await Category.find();

  if (category) {
    res.json(category);
  } else {
    res.status(404);
    throw new Error("Category not found");
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (category) {
    await category.remove();
    res.json({ message: "Category removed" });
  } else {
    res.status(404);
    throw new Error("Category not found");
  }
});

// @desc    Create a category
// @route   POST /api/category
// @access  Private/Admin
const createCategory = asyncHandler(async (req, res) => {
  const { title, slug, active, parent, home_include, nav_include } = req.body;
  // cloudinary.v2.config({
  //   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  //   api_key: process.env.CLOUDINARY_KEY,
  //   api_secret: process.env.CLOUDINARY_SECRET,
  // });

  // let uploadeResponse = await cloudinary.v2.uploader.upload(req.body.image);
  // const image = uploadeResponse.secure_url;
  const category = new Category({
    title,
    slug,
    active,
    parent,
    // image,
    home_include,
    nav_include,
  });
  const createdCategory = await category.save();
  res.status(201).json(createdCategory);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateCategory = asyncHandler(async (req, res) => {
  cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
  });

  let uploadeResponse = await cloudinary.v2.uploader.upload(req.body.image);
  const image = uploadeResponse.secure_url;
  const { title, parent, slug, nav_include, home_include, active } = req.body;
  const category = await Category.findById(req.params.id);

  if (category) {
    category.title = title;
    category.parent = parent;
    category.slug = slug;
    category.image = image;
    category.nav_include = nav_include;
    category.home_include = home_include;
    category.active = active;
    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } else {
    res.status(404);
    throw new Error("Category not found");
  }
});

export {
  getCategory,
  getNavCategory,
  getCategoryById,
  deleteCategory,
  createCategory,
  updateCategory,
  getAllCategory,
};
