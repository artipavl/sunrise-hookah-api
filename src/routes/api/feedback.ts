import express from "express";

import { Authorization, isValidBody } from "../../helpers";
import { joiAPI } from "../../schemas/JoiAPI";

import {
  addFeedback,
  removeFeedback,
  getFeedbacks,
  getFeedbacksByid,
} from "../../controllers/feedback";

const router = express.Router();

router.post("/", isValidBody(joiAPI.feedbackSchema), addFeedback);

router.get("/all", Authorization, getFeedbacks);
router.get("/:id", Authorization, getFeedbacksByid);

router.delete("/:id", Authorization, removeFeedback);

export default router;
