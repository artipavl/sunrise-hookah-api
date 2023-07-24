import { Request, Response } from "express";
import admin from "firebase-admin";

import { ctrlWrapper } from "../../helpers";

export const getPopulate = ctrlWrapper(async (_req: Request, res: Response) => {
  const docRef = admin.firestore().collection("tovars");

  const snapshot = await docRef.get();

  const tovars: FirebaseFirestore.DocumentData[] = [];

  if (snapshot.empty) {
    res.json({ tovars });
    return;
  }

  snapshot.forEach((doc) => {
    tovars.push({ ...doc.data(), id: doc.id });
  });

  tovars.sort((a, b) => b.popularity - a.popularity).splice(10, tovars.length);

  res.json({ tovars });
});
