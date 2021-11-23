import express from "express";
const router = express.Router();
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
  updateOrderToCancelled,
  paymentOption,
  generatePdf,
  generatePdfData,
  updateOrderToReturn,
  createPayment,
  completePayment,
  updateOrderToShipment
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/addPayment/payment").post(paymentOption);
router
  .route("/")
  .post(protect, addOrderItems)
  .get(getOrders);
router.route("/order/book").post(addOrderItems);
router.route("/getPdf").get(generatePdfData);

router.route("/myorders").get(protect, getMyOrders);
router.route("/generatepdf").get(generatePdf);
router.route("/:id").get(getOrderById);
router.route("/:id/pay").put(updateOrderToPaid);
router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);
router.route("/:id/cancel").put(updateOrderToCancelled);
router.route("/:id/return").put(updateOrderToReturn);
router.route("/:id/shipment").put(updateOrderToShipment);
router.route("/razorpay").post(createPayment);
router.route("/payment/:paymentId").post(completePayment);

export default router;
