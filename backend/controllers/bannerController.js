import asyncHandler from "express-async-handler";
import Banner from "../models/bannerModel.js";
import cloudinary from "cloudinary";

// @desc    Fetch all banner
// @route   GET /api/banner
// @access  Public
const getBanner = asyncHandler(async (req, res) => {
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

  const count = await Banner.countDocuments({
    $or: [{ active: "true" }, { active: true }]
  });
  const banners = await Banner.find({
    $or: [{ active: "true" }, { active: true }]
  })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json(banners);
});

// @desc    Fetch single banner
// @route   GET /api/banner/:id
// @access  Public
const getBannerById = asyncHandler(async (req, res) => {
  const banner = await Banner.findById(req.params.id);

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
const deleteBanner = asyncHandler(async (req, res) => {
  const banner = await Banner.findById(req.params.id);

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
const createBanner = asyncHandler(async (req, res) => {
  try {
    cloudinary.v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_KEY,
      api_secret: process.env.CLOUDINARY_SECRET
    });

    const { title, link, desc, short_desc, index, active } = req.body;
    let uploadeResponse = await cloudinary.v2.uploader.upload(req.body.image);
    const image = uploadeResponse.secure_url;
    const banner = new Banner({
      title,
      link,
      image,
      desc,
      short_desc,
      index,
      active
    });
    const createdBanner = await banner.save();
    res.status(201).json(createdBanner);
  } catch (err) {
    console.log(err);
  }
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateBanner = asyncHandler(async (req, res) => {
  try {
    const { title, link, desc, short_desc, index, active } = req.body;

    const banner = await Banner.findById(req.params.id);

    if (banner) {
      banner.title = title;
      banner.link = link;
      banner.desc = desc;
      banner.short_desc = short_desc;
      banner.index = index;
      banner.active = active;

      if (banner.image !== req.body.image) {
        cloudinary.v2.config({
          cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
          api_key: process.env.CLOUDINARY_KEY,
          api_secret: process.env.CLOUDINARY_SECRET
        });
        let uploadeResponse = await cloudinary.v2.uploader.upload(
          req.body.image
        );
        banner.image = uploadeResponse.secure_url;
      }
      const updatedBanner = await banner.save();
      res.json(updatedBanner);
    } else {
      res.status(404);
      throw new Error("Banner not found");
    }
  } catch (err) {
    console.log(err);
  }
});

export { getBanner, getBannerById, deleteBanner, createBanner, updateBanner };
