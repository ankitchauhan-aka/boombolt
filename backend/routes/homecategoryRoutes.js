import express from "express";
const router = express.Router();
import {
  getHomeCategory,
  getHomeCategoryById,
  deleteHomeCategory,
  createHomeCategory,
  updateHomeCategory,
  getAllHomeCategory,
} from "../controllers/homecategoryController.js";

router.route("/").get(getHomeCategory).post(createHomeCategory);
router.route("/all").get(getAllHomeCategory);

router
  .route("/:id")
  .get(getHomeCategoryById)
  .delete(deleteHomeCategory)
  .put(updateHomeCategory);

export default router;
