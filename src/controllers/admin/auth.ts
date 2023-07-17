import { Request, Response } from "express";
import admin from "firebase-admin";
import { ctrlWrapper } from "../../helpers";
// import Collection from "../../server";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

const getAdminAuth = admin.auth;

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


export const login = ctrlWrapper(async (req: Request, res: Response) => {
  const { email, password }: RequestBody = req.body;

  const auth = getAuth();
  const adminAuth = getAdminAuth();

  const credential = await signInWithEmailAndPassword(auth, email, password);

  const userAdmin = await admin.firestore()
    .doc(`users/${credential.user.uid}`)
    .get();

  const userAdminData = userAdmin.data()
  const token = await adminAuth.createCustomToken(
    credential.user.uid, { admin: userAdminData?.admin }
  );

  res.json({
    token,
    user: userAdminData
  });
});

export const current = ctrlWrapper(async (req: Request, res: Response) => {
  const { admin } = req.body;

  res.json({
    user: admin,
  });
});
