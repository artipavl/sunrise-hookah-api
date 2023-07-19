import { Request, Response } from "express";
import admin from "firebase-admin";

import { ctrlWrapper } from "../../helpers";

export const getTovarByType = ctrlWrapper(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { p = "5", uid = "" } = req.query;

    const docRef = admin.firestore().collection("tovars");
    let snapshot: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>;

    if (uid) {
      const last = await docRef.doc(String(uid)).get();
      snapshot = await docRef
        .orderBy("type")
        .where("type", "==", id)
        .startAfter(last)
        .limit(Number(p))
        .get();
    } else {
      snapshot = await docRef
        .orderBy("type")
        .where("type", "==", id)
        .limit(Number(p))
        .get();
    }

    const tovars: FirebaseFirestore.DocumentData = [];

    if (snapshot.empty) {
      res.json({ tovars, count: 0 });
      return;
    }
    snapshot.forEach((doc) => {
      tovars.push({ ...doc.data(), id: doc.id });
    });

    const count = await docRef
      .orderBy("type")
      .where("type", "==", id)
      .count()
      .get();

    res.json({ tovars, count: count.data() });
  }
);
