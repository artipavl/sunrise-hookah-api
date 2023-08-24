import { Request, Response } from "express";
import { ctrlWrapper } from "../../helpers";
import admin from "firebase-admin";
import { OrderType } from "Types";

export const updateOrder = ctrlWrapper(async (req: Request, res: Response) => {
  const { customer, orders, delivery, payment, status, date, id } = req.body;
  const order: OrderType.Order = {
    customer,
    orders,
    delivery,
    payment,
    status,
    date,
  };

  const get = await admin.firestore().collection("orders").doc(id).get();

  if (!get.data()) {
    res.status(400).json("Bad Request");
    return;
  }

  await admin
    .firestore()
    .collection("orders")
    .doc(id)
    .update({ ...order });

  res.status(201).json({ ...order, id });
});
