import { Request, Response } from "express";
import admin from "firebase-admin";

import { ctrlWrapper } from "../../helpers";

export const getFeedbacks = ctrlWrapper(
  async (_req: Request, res: Response) => {
    const docRef = admin.firestore().collection("feedbacks");

    const snapshot = await docRef.get();

    const feedbacks: FirebaseFirestore.DocumentData[] = [];

    if (snapshot.empty) {
      res.json({ feedbacks });
      return;
    }

    snapshot.forEach((doc) => {
      feedbacks.push({ ...doc.data(), id: doc.id });
    });

    res.json({ feedbacks });
  }
);
