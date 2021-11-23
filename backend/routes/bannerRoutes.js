import express from 'express'
const router = express.Router()
import {
  getBanner,
  getBannerById,
  deleteBanner,
  createBanner,
  updateBanner
} from '../controllers/bannerController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

// router.route('/').get(getBanner).post(protect, admin, createBanner)
// router
//   .route('/:id')
//   .get(getBannerById)
//   .delete(protect, admin, deleteBanner)
//   .put(protect, admin, updateBanner)
router.route('/').get(getBanner).post(createBanner)
router
  .route('/:id')
  .get(getBannerById)
  .delete(deleteBanner)
  .put(updateBanner)

export default router
