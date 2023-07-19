import admin from "firebase-admin";
import { Request, Response } from "express";
import { ctrlWrapper } from "../../helpers";

export const logout = ctrlWrapper(async (req: Request, res: Response) => {
    const { auth } = req.body;
    await admin.firestore().doc(`users/${auth.uid}`).update({ token: '' })
    res.json({ message: 'Logout success' })
})