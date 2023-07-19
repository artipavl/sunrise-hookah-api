import { Request, Response } from "express";
import admin from "firebase-admin";
import { ctrlWrapper } from "../../helpers";

export const getAllType = ctrlWrapper(async (_req: Request, res: Response) => {
  const Type = await admin.firestore().collection("types").get();

  const types: FirebaseFirestore.DocumentData = [];

  if (Type.empty) {
    res.json({ types });
    return;
  }
  
  Type.forEach((doc) => {
    types.push({ ...doc.data(), id: doc.id });
  });

  res.json(types);
});
