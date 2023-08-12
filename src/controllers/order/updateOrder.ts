import { Request, Response } from "express";
import { ctrlWrapper } from "../../helpers";
import admin from "firebase-admin";
import { OrderType } from "Types";

export const updateOrder = ctrlWrapper(async (req: Request, res: Response) => {
  const order: OrderType.Order = req.body;

  const get = await admin.firestore().collection("orders").doc(order.id).get();

  if (!get.data()) {
    res.status(400).json("Bad Request");
    return;
  }

  await admin
    .firestore()
    .collection("orders")
    .doc(order.id)
    .update({ ...order });

  res.status(201).json({ ...order });
});
