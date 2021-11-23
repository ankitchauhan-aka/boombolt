import express from "express";
const router = express.Router();
import {
  getMaterial,
  getMaterialById,
  deleteMaterial,
  createMaterial,
  updateMaterial,
  getMaterialDetails
} from "../controllers/materialController.js";

router.route("/materialtitle/:material").get(getMaterialDetails);

router
  .route("/")
  .get(getMaterial)
  .post(createMaterial);
router
  .route("/:id")
  .get(getMaterialById)
  .delete(deleteMaterial)
  .put(updateMaterial);

export default router;
