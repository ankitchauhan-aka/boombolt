import express from "express";

const router = express.Router();

import {
  getSubscriber,
  getSubscriberById,
  deleteSubscriber,
  createSubscriber,
  updateSubscriber
} from "../controllers/subscriberController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

router.route('/').get(getSubscriber).post(createSubscriber)
router
  .route('/:id')
  .get(getSubscriberById)
  .delete(deleteSubscriber)
  .put(updateSubscriber)

export default router;
