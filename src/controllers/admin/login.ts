import admin from "firebase-admin";
import { AdminUser } from "../../Types";
import { ctrlWrapper } from "../../helpers";
import { Request, Response } from "express";
import { getAuth, signInWithEmailAndPassword, } from 'firebase/auth';

const getAdminAuth = admin.auth;

export const login = ctrlWrapper(async (req: Request, res: Response) => {
    const { email, password }: AdminUser = req.body;
    const auth = getAuth();
    const adminAuth = getAdminAuth();

    const credential = await signInWithEmailAndPassword(auth, email, password);
    const userAdminPath = admin.firestore().collection('users').doc(credential.user.uid);
    const userAdminData = (await userAdminPath.get()).data();

    const token = await adminAuth.createCustomToken(credential.user.uid, { admin: userAdminData?.admin });

    await userAdminPath.update({ token });

    delete userAdminData?.token;
    
    res.json({
        token,
        user: {
            ...userAdminData,
        }
    });
});