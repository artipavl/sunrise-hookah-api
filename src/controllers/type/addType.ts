import { Request, Response } from "express";
import admin from "firebase-admin";
import { ctrlWrapper } from "../../helpers";

interface RequestBody {
  ua: string;
  eu: string;
}

export const addType = ctrlWrapper(async (req: Request, res: Response) => {
  const { ua, eu }: RequestBody = req.body;

  const Type = await admin.firestore().collection("types").add({
    ua,
    eu,
  });

  res.json({
    id: Type.id,
    ua,
    eu,
  });
});
