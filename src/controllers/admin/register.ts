import admin from "firebase-admin";
import { AdminUser } from "../../Types";
import { ctrlWrapper } from "../../helpers";
import { Request, Response } from "express";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export const registers = ctrlWrapper(async (req: Request, res: Response) => {
  const { email, password, name }: AdminUser = req.body;
  const { admin: user } = req.body.admin;

  if (user !== "root") {
    res.status(400).json("Bad Request");
  }

  const auth = getAuth();
  const credential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  await admin
    .firestore()
    .doc(`users/${credential.user.uid}`)
    .set({ email, name, admin: "admin" });

  res.status(201).json({ id: credential.user.uid,  email, name, admin: "admin" });
});
