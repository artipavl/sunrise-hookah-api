import { Request, Response } from "express";
import { ctrlWrapper } from "../../helpers";
import admin from "firebase-admin";
import { FieldValue } from "firebase-admin/firestore";

import { OrderType } from "../../Types";

export const addOrder = ctrlWrapper(async (req: Request, res: Response) => {
  const { customer, orders, delivery, payment } = req.body;
  const order: OrderType.AddOrder = { customer, orders, delivery, payment };
  for (const item of order.orders) {
    try {
      await admin
        .firestore()
        .collection("tovars")
        .doc(item.id)
        .update({
          population: FieldValue.increment(item.baskeQuantity),
        });
    } catch (error) {
      res.status(500).json("Bad Request");
    }
  }
  const date = new Date().getTime();
  const newOrder = await admin
    .firestore()
    .collection("orders")
    .add({ ...order, status: "new", date });

  res.status(201).json({ ...order, id: newOrder.id, status: "new", date });
});
