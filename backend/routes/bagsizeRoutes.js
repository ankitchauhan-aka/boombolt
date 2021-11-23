import express from "express";
const router = express.Router();
import {
  getBagsize,
  getBagsizeById,
  deleteBagsize,
  createBagsize,
  updateBagsize,
  getBagsizeDetails,
} from "../controllers/bagsizeController.js";

router.route("/bagsizetitle/:bagsize").get(getBagsizeDetails);

router.route("/").get(getBagsize).post(createBagsize);
router.route("/:id").get(getBagsizeById).delete(deleteBagsize).put(updateBagsize);

export default router;
