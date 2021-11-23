import asyncHandler from "express-async-handler";
import Brand from "../models/brandModel.js";
import Category from "../models/categoryModel.js";
import cloudinary from "cloudinary";


// @desc    Fetch all brand
// @route   GET /api/brand
// @access  Public
const getBrand = asyncHandler(async (req, res) => {
  // const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;
  let query = {};
  if (req.query.category) {
    let category = await Category.findOne({
      slug: {
        $regex: req.query.category,
        $options: "i",
      },
    }).select("_id");
    let searchCategories = [];
    if (category) {
      let childCategory = await Category.find({ parent: category._id }).select(
        "_id"
      );
      searchCategories = childCategory.map((cat) => cat._id);
      searchCategories.push(category._id);
      query = { categories: { $in: searchCategories } };
    }
  } else if (req.query.slug) {
    query.description = {
        $regex: req.query.slug,
        $options: "i",
      }
  }
  const brands = await Brand.find().populate({path: 'count', select: 'name', match: query})
  
  let finalBrands = brands;
  
  
  let minAll = 0;
  let maxAll = 0;
  let minPriceRange = 999999;
  let maxPriceRange = 0;
  res.json({ finalBrands, maxPriceRange, minPriceRange, minAll, maxAll });
});

// @desc    Fetch single brand
// @route   GET /api/brand/:id
// @access  Public
const getBrandById = asyncHandler(async (req, res) => {
  const brand = await Brand.findById(req.params.id);

  if (brand) {
    res.json(brand);
  } else {
    res.status(404);
    throw new Error("Brand not found");
  }
});

// @desc    Fetch home brands
// @route   GET /api/brand/:id
// @access  Public
const getHomeBrand = asyncHandler(async (req, res) => {
  const brand = await Brand.find({ home_include: true });

  if (brand) {
    res.json(brand);
  } else {
    res.status(404);
    throw new Error("Brand not found");
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteBrand = asyncHandler(async (req, res) => {
  const brand = await Brand.findById(req.params.id);

  if (brand) {
    await brand.remove();
    res.json({ message: "Brand removed" });
  } else {
    res.status(404);
    throw new Error("Brand not found");
  }
});

// @desc    Create a brand
// @route   POST /api/brand
// @access  Private/Admin
const createBrand = asyncHandler(async (req, res) => {
  try {
    cloudinary.v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_KEY,
      api_secret: process.env.CLOUDINARY_SECRET,
    });
    const { title, slug, active, home_include } = req.body;
    let uploadeResponse = await cloudinary.v2.uploader.upload(req.body.image);
    const image = uploadeResponse.secure_url;
    const brand = new Brand({ title, slug, image, active, home_include });
    const createdBrand = await brand.save();
    res.status(201).json(createdBrand);
  } catch (err) {
    console.log(err);
  }
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateBrand = asyncHandler(async (req, res) => {
  const { title, slug, active, home_include } = req.body;

  const brand = await Brand.findById(req.params.id);

  if (brand) {
    brand.title = title;
    brand.slug = slug;
    brand.active = active;
    brand.home_include = home_include;
    if (brand.image !== req.body.image) {
      cloudinary.v2.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_KEY,
        api_secret: process.env.CLOUDINARY_SECRET,
      });
      let uploadeResponse = await cloudinary.v2.uploader.upload(req.body.image);
      brand.image = uploadeResponse.secure_url;
    }
    const updatedBrand = await brand.save();
    res.json(updatedBrand);
  } else {
    res.status(404);
    throw new Error("Brand not found");
  }
});

export {
  getBrand,
  getBrandById,
  deleteBrand,
  createBrand,
  updateBrand,
  getHomeBrand,
};
