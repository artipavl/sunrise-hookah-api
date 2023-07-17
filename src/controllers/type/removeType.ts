import { Request, Response } from "express";
import admin from "firebase-admin";
import { ctrlWrapper } from "../../helpers";

export const removeType = ctrlWrapper(async (req: Request, res: Response) => {
  const { id } = req.params;

  const Type = await admin.firestore().collection("types").doc(id).delete();

  if (!Type) {
    res.status(400).json("Bad Request");
  }
  console.log(Type);

  res.json("OK");
});
