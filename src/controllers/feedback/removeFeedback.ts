import { Request, Response } from "express";
import admin from "firebase-admin";
import { ctrlWrapper } from "../../helpers";

export const removeFeedback = ctrlWrapper(async (req: Request, res: Response) => {
  const { id } = req.params;

  const tovar = await admin
    .firestore()
    .collection("feedbacks")
    .doc(id)
    .delete();

  if (!tovar) {
    res.status(400).json("Bad Request");
  }

  res.json("OK");
});
