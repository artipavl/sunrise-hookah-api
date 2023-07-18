import { Request, Response } from "express";
import admin from "firebase-admin";
import { ctrlWrapper } from "../../helpers";

export const getTovarByType = ctrlWrapper(async (req: Request, res: Response) => {
  const { id } = req.params;

  const Type = await admin.firestore().collection("tovars").doc(id).get();

  if (!Type.data()) {
    res.status(400).json("Bad Request");
  }

  res.json({ ...Type.data() });
});
