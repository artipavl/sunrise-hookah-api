import { Request, Response } from "express";
import { ctrlWrapper } from "../../helpers";
import admin from "firebase-admin";
import { Feedback } from "../../Types";

export const addFeedback = ctrlWrapper(async (req: Request, res: Response) => {
  const feedback: Feedback = req.body;

  await admin.firestore().collection("feedbacks").add(feedback);

  res.status(201).json("OK");
});
