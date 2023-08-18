import { Request, Response } from "express";
import admin from "firebase-admin";
import { ctrlWrapper } from "../../helpers";

export const removeFeedback = ctrlWrapper(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const feedback = admin.firestore().collection("feedbacks").doc(id);
    const getFeedback = (await feedback.get()).data();

    if (!getFeedback) {
      res.status(400).json("Bad Request");
    }

    await feedback.delete();

    res.json("OK");
  }
);
