import express from "express";
const router = express.Router();
import {
  getColor,
  getColorById,
  deleteColor,
  createColor,
  updateColor,
  getColorDetails,
} from "../controllers/colorController.js";

router.route("/colortitle/:color").get(getColorDetails);

router.route("/").get(getColor).post(createColor);
router.route("/:id").get(getColorById).delete(deleteColor).put(updateColor);

export default router;
