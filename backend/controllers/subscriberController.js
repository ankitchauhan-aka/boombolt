import asyncHandler from 'express-async-handler'
import Subscriber from '../models/subscriberModel.js'


// @desc    Fetch all subscriber
// @route   GET /api/subscriber
// @access  Public
const getSubscriber = asyncHandler(async (req, res) => {
  const pageSize = 10
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}

  const count = await Subscriber.countDocuments({ ...keyword })
  const subscribers = await Subscriber.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
  
  // res.json({ subscribers, page, pages: Math.ceil(count / pageSize) })
  res.json(subscribers)
})

// @desc    Fetch single subscriber
// @route   GET /api/subscriber/:id
// @access  Public
const getSubscriberById = asyncHandler(async (req, res) => {
  const subscriber = await Subscriber.findById(req.params.id)

  if (subscriber) {
    res.json(subscriber)
  } else {
    res.status(404)
    throw new Error('Subscriber not found')
  }
})

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteSubscriber = asyncHandler(async (req, res) => {
  const subscriber = await Subscriber.findById(req.params.id)

  if (subscriber) {
    await subscriber.remove()
    res.json({ message: 'Subscriber removed' })
  } else {
    res.status(404)
    throw new Error('Subscriber not found')
  }
})

// @desc    Create a subscriber
// @route   POST /api/subscriber
// @access  Private/Admin
const createSubscriber = asyncHandler(async (req, res) => {
  
    const { email } = req.body
    const subscriber = new Subscriber({ email})
    const createdSubscriber = await subscriber.save()
    res.status(201).json(createdSubscriber)
  
})

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateSubscriber = asyncHandler(async (req, res) => {
  try {
    const { email, active } = req.body
    const subscriber = await Subscriber.findById(req.params.id)
    if (subscriber) {
      subscriber.email = email
      subscriber.active = active
      const updatedSubscriber = await subscriber.save()
      res.json(updatedSubscriber)
    } else {
      res.status(404)
      throw new Error('Subscriber not found')
    }
  }catch(err) {
    console.log(err)
  }
})

export {
  getSubscriber,
  getSubscriberById,
  deleteSubscriber,
  createSubscriber,
  updateSubscriber
}
