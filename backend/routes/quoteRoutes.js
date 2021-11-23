import express from "express";
const router = express.Router();
import { RequestQuote } from "../controllers/quoteController.js";

router.route("/quote").post(RequestQuote);

export default router;
