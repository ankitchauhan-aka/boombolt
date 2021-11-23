import express from "express";
const router = express.Router();
import {
  getHotDeal,
  getHotDealById,
  deleteHotDeal,
  createHotDeal,
  updateHotDeal,
  getAllHotDeal,
} from "../controllers/hotdealsController.js";

router.route("/").get(getHotDeal).post(createHotDeal);
router.route("/all").get(getAllHotDeal);

router
  .route("/:id")
  .get(getHotDealById)
  .delete(deleteHotDeal)
  .put(updateHotDeal);

export default router;
