import express from "express";
const router = express.Router();
import {
  getSpecs,
  getSpecsById,
  deleteSpecs,
  createSpecs,
  updateSpecs,
  getHomeSpecs,
  createCustomSpecs
} from "../controllers/specController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

// router.route('/').get(getSpecs).post(protect, admin, createSpecs)
// router
//   .route('/:id')
//   .get(getSpecsById)
//   .delete(protect, admin, deleteSpecs)
//   .put(protect, admin, updateSpecs)
router.route("/home").get(getHomeSpecs);

router.route("/createCustom").get(createCustomSpecs);
router.route("/").get(getSpecs).post(createSpecs);
router.route("/:id").get(getSpecsById).delete(deleteSpecs).put(updateSpecs);

export default router;
