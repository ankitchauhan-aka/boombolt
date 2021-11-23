import asyncHandler from "express-async-handler";
import Event from "../models/eventModel.js";
import cloudinary from "cloudinary";

// @desc    Fetch all event
// @route   GET /api/event
// @access  Public

// const getEvent = asyncHandler(async (req, res) => {
//   const events = await Event.find({});
//   res.json(events);
// });

const getEvent = asyncHandler(async (req, res) => {
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

  const count = await Event.countDocuments({
    $or: [{ active: "true" }, { active: true }]
  });
  const events = await Event.find({
    $or: [{ active: "true" }, { active: true }]
  })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json(events);
});

// @desc    Fetch single event
// @route   GET /api/event/:id
// @access  Public
const getEventById = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (event) {
    res.json(event);
  } else {
    res.status(404);
    throw new Error("Event not found");
  }
});

// @desc    Delete a product
// @route   DELETE /api/event/:id
// @access  Private/Admin
const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (event) {
    await event.remove();
    res.json({ message: "Event removed" });
  } else {
    res.status(404);
    throw new Error("Event not found");
  }
});

// @desc    Create a event
// @route   POST /api/event
// @access  Private/Admin
const createEvent = asyncHandler(async (req, res) => {
  try {
    cloudinary.v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_KEY,
      api_secret: process.env.CLOUDINARY_SECRET,
    });

    const { title, location, startfrom, endson, desc,active } = req.body;
    let uploadeResponse = await cloudinary.v2.uploader.upload(req.body.image);
    const image = uploadeResponse.secure_url;
    const event = new Event({
      title,
      location,
      startfrom,
      endson,     
      desc,
      image,
      active,
    });
    const createdEvent = await event.save();
    res.status(201).json(createdEvent);
  } catch (err) {
    console.log(err);
  }
});

// @desc    Update a product
// @route   PUT /api/event/:id
// @access  Private/Admin
const updateEvent = asyncHandler(async (req, res) => {
  try {
    const { title, location, startfrom, endson, desc, active } = req.body;

    const event = await Event.findById(req.params.id);

    if (event) {
      event.title = title;
      event.location = location;
      event.startfrom = startfrom;
      event.endson = endson;
      event.desc = desc;
      event.active = active;
      
      if (event.image !== req.body.image) {
        cloudinary.v2.config({
          cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
          api_key: process.env.CLOUDINARY_KEY,
          api_secret: process.env.CLOUDINARY_SECRET,
        });
        let uploadeResponse = await cloudinary.v2.uploader.upload(
          req.body.image
        );
        event.image = uploadeResponse.secure_url;
      }
      const updatedEvent = await event.save();
      res.json(updatedEvent);
    } else {
      res.status(404);
      throw new Error("Event not found");
    }
  } catch (err) {
    console.log(err);
  }
});

export { getEvent, getEventById, deleteEvent, createEvent, updateEvent };
