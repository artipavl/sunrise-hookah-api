import { Request, Response } from "express";
import admin from "firebase-admin";
import { ctrlWrapper } from "../../helpers";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from 'firebase/auth';


interface RequestBody {
  email: string;
  password: string;
  name: string;
}

export const registers = ctrlWrapper(async (req: Request, res: Response) => {
  const { email, password, name }: RequestBody = req.body;

  const auth = getAuth();
  const credential = await createUserWithEmailAndPassword(auth, email, password);

  await admin.firestore()
    .doc(`users/${credential.user.uid}`)
    .set({ email, name, admin: 'admin' });

  res.status(201).json('cool');
})


