import express from "express";
const router = express.Router();
import {
  getTax,
  getTaxById,
  deleteTax,
  createTax,
  updateTax,
} from "../controllers/taxController.js";

router.route("/").get(getTax).post(createTax);
router.route("/:id").get(getTaxById).delete(deleteTax).put(updateTax);

export default router;
