import { Request, Response } from "express";
import admin from "firebase-admin";
import { ctrlWrapper } from "../../helpers";

export const getTovarByid = ctrlWrapper(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { p = "10", uid = "" } = req.query;

  const Type = await admin
    .firestore()
    .collection("tovars")
    .orderBy("type")
    .where("type", "==", id)
    .startAfter(uid)
    .limit(Number(p))
    .count()
    .get();

  if (!Type.data()) {
    res.status(400).json("Bad Request");
  }

  res.json({ ...Type.data() });
});
