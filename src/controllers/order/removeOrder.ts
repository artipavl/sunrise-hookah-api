import { Request, Response } from "express";
import admin from "firebase-admin";
import { ctrlWrapper } from "../../helpers";

export const removeOrder = ctrlWrapper(async (req: Request, res: Response) => {
  const { id } = req.params;

  const order = await admin.firestore().collection("orders").doc(id).delete();

  if (!order) {
    res.status(400).json("Bad Request");
  }

  res.json("OK");
});
