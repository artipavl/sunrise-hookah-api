import { Request, Response } from "express";
import { ctrlWrapper } from "../../helpers";
import admin from "firebase-admin";
import { FieldValue } from "firebase-admin/firestore";

import { OrderType } from "../../Types";

export const addOrder = ctrlWrapper(async (req: Request, res: Response) => {
  const order: OrderType.AddOrder = req.body;

  for (const item of order.orders) {
    try {
      await admin
        .firestore()
        .collection("orders")
        .doc(item.id)
        .update({
          population: FieldValue.increment(item.baskeQuantity),
        });
    } catch (error) {
      res.status(500).json("Bad Request");
    }
  }

  const newOrder = await admin
    .firestore()
    .collection("orders")
    .add({ ...order, status: "new" });

  res.status(201).json({ ...order, id: newOrder.id, status: "new" });
});
