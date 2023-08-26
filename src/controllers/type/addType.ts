import { Request, Response } from "express";
import admin from "firebase-admin";
import { ctrlWrapper } from "../../helpers";

interface RequestBody {
  ukr: string;
  en: string;
}

export const addType = ctrlWrapper(async (req: Request, res: Response) => {
  const { ukr, en }: RequestBody = req.body;

  const Type = await admin.firestore().collection("types").add({
    ukr,
    en,
  });

  res.json({
    id: Type.id,
    ukr,
    en,
  });
});
