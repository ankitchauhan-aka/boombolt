import express from "express";
const router = express.Router();
import {
  getState,
  getStateById,
  deleteState,
  createState,
  updateState,
  getHomeState,
  getZipcodeState,
} from "../controllers/stateController.js";

router.route("/home").get(getHomeState);
router.route("/home/:id").get(getZipcodeState);

router.route("/").get(getState).post(createState);
router.route("/:id").get(getStateById).delete(deleteState).put(updateState);

export default router;
