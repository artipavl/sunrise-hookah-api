import { Request, Response } from "express";
import admin from "firebase-admin";
import { ctrlWrapper } from "../../helpers";
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
  const userAdminPath = admin.firestore().collection('users').doc(credential.user.uid);
  const userAdminData = (await userAdminPath.get()).data();
 
  const token = await adminAuth.createCustomToken(
    credential.user.uid, { admin: userAdminData?.admin }
  );
  await userAdminPath.update({ token });

  delete userAdminData?.token;

  res.json({
    token,
    user: {
      ...userAdminData,
    }
  });
});


export const logout = ctrlWrapper(async (req: Request, res: Response) => {
  const { auth } = req.body;
 
  await admin.firestore().doc(`users/${auth.uid}`).update({ token: '' })

  res.json({ message: 'Logout success' })
})

export const current = ctrlWrapper(async (req: Request, res: Response) => {
  const { admin } = req.body;
  delete admin?.token;

  res.json({
    user: admin,
  });
});
