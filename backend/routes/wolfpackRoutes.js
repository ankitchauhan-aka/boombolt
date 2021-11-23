import express from "express";

const router = express.Router();
import {
    paymentOption,
    addOrderItems,
    wolfpackOrder,

} from "../controllers/wolfpackController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/addPayment/payment").post(paymentOption);
router.route("/").post(protect, addOrderItems);
router.route("/order/book").post(addOrderItems);
router.route("/").get(protect,wolfpackOrder);

export default router;
