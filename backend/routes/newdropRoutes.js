import express from "express";
const router = express.Router();
import {
  getNewDrop,
  getNewDropById,
  deleteNewDrop,
  createNewDrop,
  updateNewDrop
} from "../controllers/newdropController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

// router.route('/').get(getBanner).post(protect, admin, createBanner)
// router
//   .route('/:id')
//   .get(getBannerById)
//   .delete(protect, admin, deleteBanner)
//   .put(protect, admin, updateBanner)
router
  .route("/")
  .get(getNewDrop)
  .post(createNewDrop);
router
  .route("/:id")
  .get(getNewDropById)
  .delete(deleteNewDrop)
  .put(updateNewDrop);

export default router;
