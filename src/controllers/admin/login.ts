import admin from "firebase-admin";
import { Request, Response } from "express";
import { ctrlWrapper } from "../../helpers";
import { getAuth, signInWithEmailAndPassword, } from 'firebase/auth';
import { AdminUser } from "../../Types";

const getAdminAuth = admin.auth;

export const login = ctrlWrapper(async (req: Request, res: Response) => {
    const { email, password }: AdminUser = req.body;

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