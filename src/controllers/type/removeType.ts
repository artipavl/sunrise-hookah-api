import { Request, Response } from "express";
import admin from "firebase-admin";
import { ctrlWrapper } from "../../helpers";

export const removeType = ctrlWrapper(async (req: Request, res: Response) => {
  const { id } = req.params;

  const Type = admin.firestore().collection("types").doc(id);
  const getType = (await Type.get()).data();

  if (!getType) {
    res.status(400).json("Bad Request");
  }

  await Type.delete();

  res.json("OK");
});
