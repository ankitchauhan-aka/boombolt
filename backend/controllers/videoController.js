import asyncHandler from "express-async-handler";
import Video from "../models/videoModel.js"
import cloudinary from "cloudinary";

// @desc    Fetch all video
// @route   GET /api/video
// @access  Public
const getVideo = asyncHandler(async (req, res) => {
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

  const count = await Video.countDocuments({
    $or: [{ active: "true" }, { active: true }],
  });
  const videos = await Video.find({
    $or: [{ active: "true" }, { active: true }],
  })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json(videos);
});
// @desc    Fetch single video
// @route   GET /api/video/:id
// @access  Public

const getVideoById = asyncHandler(async (req, res) => {
  const video = await Video.findById(req.params.id);

  if (video) {
    res.json(video);
  } else {
    res.status(404);
    throw new Error("Video not found");
  }
});
// @desc    Delete a video
// @route   DELETE /api/video/:id
// @access  Private/Admin

const deleteVideo = asyncHandler(async (req, res) => {
  const video = await Video.findById(req.params.id);

  if (video) {
    await video.remove();
    res.json({ message: "Video removed" });
  } else {
    res.status(404);
    throw new Error("Video not found");
  }
});
// @desc    Create a video
// @route   POST /api/video
// @access  Private/Admin

const createVideo = asyncHandler(async (req, res) => {
  try {
    cloudinary.v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_KEY,
      api_secret: process.env.CLOUDINARY_SECRET,
    });

    const { title, link, desc, short_desc, index, active } = req.body;

    let uploadeResponse = await cloudinary.v2.uploader.upload(req.body.mp4file,{
      resource_type: "auto",
    });
    const mp4file = uploadeResponse.secure_url;

    let uploadeResponse1 = await cloudinary.v2.uploader.upload(req.body.image);
    const image = uploadeResponse1.secure_url;
    const video = new Video({
      title,
      link,
      mp4file,
      image,
      desc,
      short_desc,
      index,
      active,
    });
    const createdVideo = await video.save();
    res.status(201).json(createdVideo);
  } catch (err) {
    console.log(err);
  }
});

// @desc    Update a video
// @route   PUT /api/video/:id
// @access  Private/Admin
const updateVideo = asyncHandler(async (req, res) => {
  try {
    const { title, link, desc, short_desc, index, active } = req.body;

    const video = await Video.findById(req.params.id);

    if (video) {
        video.title = title;
        video.link = link;
        video.desc = desc;
        video.short_desc = short_desc;
        video.index = index;
        video.active = active;

      if (video.mp4file !== req.body.mp4file && video.image !== req.body.image) {
        cloudinary.v2.config({
          cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
          api_key: process.env.CLOUDINARY_KEY,
          api_secret: process.env.CLOUDINARY_SECRET,
        });
        
        let uploadeResponse = await cloudinary.v2.uploader.upload(
          req.body.mp4file
        );
        video.mp4file = uploadeResponse.secure_url;

        let uploadeResponse1 = await cloudinary.v2.uploader.upload(req.body.image);
        video.image = uploadeResponse1.secure_url;
      }
      const updatedVideo = await video.save();
      res.json(updatedVideo);
    } else {
      res.status(404);
      throw new Error("Video not found");
    }
  } catch (err) {
    console.log(err);
  }
});

export { getVideo, getVideoById, deleteVideo, createVideo, updateVideo };
