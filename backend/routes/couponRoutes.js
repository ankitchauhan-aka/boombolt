import express from "express";
const router = express.Router();
import {
  getCoupon,
  getCouponById,
  deleteCoupon,
  createCoupon,
  updateCoupon,
  getCouponDetails,
} from "../controllers/couponController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/coupontitle/:coupon").get(getCouponDetails);
// router.route('/').get(getCoupon).post(protect, admin, createCoupon)
// router
//   .route('/:id')
//   .get(getCouponById)
//   .delete(protect, admin, deleteCoupon)
//   .put(protect, admin, updateCoupon)
router.route("/").get(getCoupon).post(createCoupon);
router.route("/:id").get(getCouponById).delete(deleteCoupon).put(updateCoupon);

export default router;
