import { Request, Response } from "express";
import admin from "firebase-admin";
import bcrypt from "bcrypt";
import { ctrlWrapper } from "../../helpers";
// import Collection from "../../server";

interface RequestBody {
  email: string;
  password: string;
  name: string;
}

export const register = ctrlWrapper(async (req: Request, res: Response) => {
  const { email, password, name }: RequestBody = req.body;

  const hashedPassword = await bcrypt.hash(password, 12);

  const auth = await admin.auth().createUser({
    email,
    password: hashedPassword,
    displayName: name,

    emailVerified: false,
    disabled: false,
  });

  await admin.firestore().collection("users").doc(auth.uid).set({
    role: "supper",
    name,
  });

  res.json({ email: auth.email });
});
