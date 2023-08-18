import { Request, Response } from "express";
import admin from "firebase-admin";
import { ctrlWrapper } from "../../helpers";

export const removeTovar = ctrlWrapper(async (req: Request, res: Response) => {
  const { id } = req.params;

  const tovar = admin.firestore().collection("tovars").doc(id);
  const getTovar = (await tovar.get()).data();

  if (!getTovar) {
    res.status(400).json("Bad Request");
  }

  await tovar.delete();

  res.json("OK");
});
