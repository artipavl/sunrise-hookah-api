import { Request, Response } from "express";
import admin from "firebase-admin";

import { ctrlWrapper } from "../../helpers";

export const getOrders = ctrlWrapper(async (_req: Request, res: Response) => {
  const docRef = admin.firestore().collection("orders");

  const snapshot = await docRef.get();

  const orders: FirebaseFirestore.DocumentData[] = [];

  if (snapshot.empty) {
    res.json({ orders });
    return;
  }

  snapshot.forEach((doc) => {
    orders.push({ ...doc.data(), id: doc.id });
  });

  res.json({ orders });
});
