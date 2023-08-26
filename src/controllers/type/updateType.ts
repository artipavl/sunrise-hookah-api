import { Request, Response } from "express";
import admin from "firebase-admin";
import { ctrlWrapper } from "../../helpers";

interface RequestBody {
  ukr: string;
  en: string;
}

export const updateType = ctrlWrapper(async (req: Request, res: Response) => {
  const { ukr, en }: RequestBody = req.body;
  const { id } = req.params;

  const Type = await admin.firestore().collection("types").doc(id).get();

  if (!Type.data()) {
    res.status(400).json("Bad Request");
    return;
  }

  await admin.firestore().collection("types").doc(id).set({ ukr, en });

  res.json({
    id: Type.id,
    ukr,
    en,
  });
});
