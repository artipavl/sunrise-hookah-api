import { Request, Response } from "express";
import admin from "firebase-admin";

import { ctrlWrapper } from "../../helpers";

export const getAdmins = ctrlWrapper(async (req: Request, res: Response) => {
  const { admin: user } = req.body.admin;
  
  if (user !== "root") {
    res.status(400).json("Bad Request");
    return;
  }

  const docRef = admin.firestore().collection("users");

  const snapshot = await docRef.get();

  const admins: FirebaseFirestore.DocumentData[] = [];

  if (snapshot.empty) {
    res.json({ admins });
    return;
  }

  snapshot.forEach((doc) => {
    const admin = doc.data();
    delete admin.token;
    admins.push({ ...admin, id: doc.id });
  });

  res.json({ admins });
});
