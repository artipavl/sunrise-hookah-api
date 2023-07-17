import { Request, Response } from "express";
import admin from "firebase-admin";
import { ctrlWrapper } from "../../helpers";

interface RequestBody {
  ua: string;
  eu: string;
}

export const updateType = ctrlWrapper(async (req: Request, res: Response) => {
  const { ua, eu }: RequestBody = req.body;
  const { id } = req.params;

  const Type = await admin.firestore().collection("types").doc(id).get();

  if (!Type.data()) {
    res.status(400).json("Bad Request");
  }

  await admin.firestore().collection("types").doc(id).set({ ua, eu });

  res.json({
    id: Type.id,
    ua,
    eu,
  });
});
