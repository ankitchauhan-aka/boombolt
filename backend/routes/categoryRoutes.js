import express from "express";
const router = express.Router();
import {
  getCategory,
  getNavCategory,
  getCategoryById,
  deleteCategory,
  createCategory,
  updateCategory,
  getAllCategory,
} from "../controllers/categoryController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(getCategory).post(createCategory);
router.route("/nav").get(getNavCategory);
router.route("/all").get(getAllCategory);

router
  .route("/:id")
  .get(getCategoryById)
  .delete(deleteCategory)
  .put(updateCategory);

export default router;
