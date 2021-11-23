import express from "express";
const router = express.Router();
import { Contactus } from "../controllers/contactusController.js";

router.route("/contact").post(Contactus);

export default router;
