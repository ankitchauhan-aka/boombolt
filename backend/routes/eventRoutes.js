import express from 'express'
const router = express.Router()
import {
  getEvent,
  getEventById,
  deleteEvent,
  createEvent,
  updateEvent
} from '../controllers/eventController.js'

router.route('/').get(getEvent).post(createEvent)
router
  .route('/:id')
  .get(getEventById)
  .delete(deleteEvent)
  .put(updateEvent)

export default router
