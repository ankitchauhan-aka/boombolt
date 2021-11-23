import express from "express";
const router = express.Router();
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
  getProductBySlug,
  getProductByBrand,
  getSaleProducts,
  createCustom
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
router.route("/createCustom").get(createCustom);

router.route("/slug/:slug").get(getProductBySlug);
router.route("/brand/:brandId").get(getProductByBrand);
// router.route("/").get(getProducts).post(protect, admin, createProduct);
router.route("/:id/reviews").post(protect, createProductReview);
router.get("/top", getTopProducts);
router.get("/sale", getSaleProducts);

router
  .route("/:id")
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(updateProduct);
router
  .route("/")
  .get(getProducts)
  .post(createProduct);
router.route("/:id/reviews").post(createProductReview);
router.get("/top", getTopProducts);
// router
//   .route('/:id')
//   .get(getProductById)
//   .delete(deleteProduct)
//   .put(updateProduct)

export default router;
