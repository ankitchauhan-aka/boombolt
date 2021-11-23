import asyncHandler from "express-async-handler";
import NewDrop from "../models/newdropModel.js";
import cloudinary from "cloudinary";

// @desc    Fetch all banner
// @route   GET /api/banner
// @access  Public

const getNewDrop = asyncHandler(async (req, res) => {
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

  const count = await NewDrop.countDocuments({
    $or: [{ active: "true" }, { active: true }]
  });
  const banners = await NewDrop.find()
    .populate(["categories"])
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json(banners);
});

// @desc    Fetch single banner
// @route   GET /api/banner/:id
// @access  Public
const getNewDropById = asyncHandler(async (req, res) => {
  const banner = await await NewDrop.findById(req.params.id).populate([
    "categories"
  ]);

  if (banner) {
    res.json(banner);
  } else {
    res.status(404);
    throw new Error("Banner not found");
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteNewDrop = asyncHandler(async (req, res) => {
  const banner = await NewDrop.findById(req.params.id);

  if (banner) {
    await banner.remove();
    res.json({ message: "Banner removed" });
  } else {
    res.status(404);
    throw new Error("Banner not found");
  }
});

// @desc    Create a banner
// @route   POST /api/banner
// @access  Private/Admin
const createNewDrop = asyncHandler(async (req, res) => {
  try {
    cloudinary.v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_KEY,
      api_secret: process.env.CLOUDINARY_SECRET
    });
    const categoryPromise = req.body.categories.map(category => category.value);
    const data = await Promise.all([categoryPromise]);
    const { title } = req.body;
    let uploadeResponse = await cloudinary.v2.uploader.upload(
      req.body.backimage
    );
    const backimage = uploadeResponse.secure_url;
    uploadeResponse = await cloudinary.v2.uploader.upload(req.body.logo);
    const logo = uploadeResponse.secure_url;
    var categories = data[0];
    const newdrop = new NewDrop({
      title,
      categories,
      backimage,
      logo
    });
    const createdNewDrop = await newdrop.save();
    res.status(201).json(createdNewDrop);
  } catch (err) {
    console.log(err);
  }
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateNewDrop = asyncHandler(async (req, res) => {
  try {
    const { title } = req.body;
    const categoryPromise = req.body.categories.map(category => category.value);
    const data = await Promise.all([categoryPromise]);
    const newdrop = await NewDrop.findById(req.params.id);
    if (newdrop) {
      newdrop.title = title;
      if (data[0][0] != undefined) {
        newdrop.categories = data[0];
      }
      if (newdrop.backimage !== req.body.backimage) {
        cloudinary.v2.config({
          cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
          api_key: process.env.CLOUDINARY_KEY,
          api_secret: process.env.CLOUDINARY_SECRET
        });
        let uploadeResponse = await cloudinary.v2.uploader.upload(
          req.body.backimage
        );
        newdrop.backimage = uploadeResponse.secure_url;
      }
      if (newdrop.logo !== req.body.logo) {
        cloudinary.v2.config({
          cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
          api_key: process.env.CLOUDINARY_KEY,
          api_secret: process.env.CLOUDINARY_SECRET
        });
        let uploadeResponse = await cloudinary.v2.uploader.upload(
          req.body.logo
        );
        newdrop.logo = uploadeResponse.secure_url;
      }
      const updatedNewdrop = await newdrop.save();
      res.json(updatedNewdrop);
    } else {
      res.status(404);
      throw new Error("Banner not found");
    }
  } catch (err) {
    console.log(err);
  }
});

export {
  getNewDrop,
  getNewDropById,
  deleteNewDrop,
  createNewDrop,
  updateNewDrop
};
