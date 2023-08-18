import { Request, Response } from "express";
import admin from "firebase-admin";
import { ctrlWrapper } from "../../helpers";

export const removeOrder = ctrlWrapper(async (req: Request, res: Response) => {
  const { id } = req.params;

  const order = admin.firestore().collection("orders").doc(id);
  const getOrder = (await order.get()).data();

  if (!getOrder) {
    res.status(400).json("Bad Request");
  }

  await order.delete();

  res.json("OK");
});
