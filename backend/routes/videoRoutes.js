import express from 'express'
const router = express.Router()
import {
  getVideo,
  getVideoById,
  deleteVideo,
  createVideo,
  updateVideo
} from '../controllers/videoController.js'
import { protect, admin } from '../middleware/authMiddleware.js'
router.route('/').get(getVideo).post(createVideo)
router
  .route('/:id')
  .get(getVideoById)
  .delete(deleteVideo)
  .put(updateVideo)

export default router
