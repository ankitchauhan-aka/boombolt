import express from "express";
const router = express.Router();
import {
  getBrand,
  getBrandById,
  deleteBrand,
  createBrand,
  updateBrand,
  getHomeBrand,
} from "../controllers/brandController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

// router.route('/').get(getBrand).post(protect, admin, createBrand)
// router
//   .route('/:id')
//   .get(getBrandById)
//   .delete(protect, admin, deleteBrand)
//   .put(protect, admin, updateBrand)
router.route("/home").get(getHomeBrand);
router.route("/").get(getBrand).post(createBrand);
router.route("/:id").get(getBrandById).delete(deleteBrand).put(updateBrand);

export default router;
