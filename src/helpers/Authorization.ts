import { Response, Request, NextFunction } from "express";
import HttpError from "./HttpError";
import admin from "firebase-admin";
import { getAuth, signInWithCustomToken } from "firebase/auth";

const Authorization = async (req: Request, _: Response, next: NextFunction) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  console.log(bearer, token)
  if (bearer !== "Bearer") {
    next(new HttpError(401, "Not authorized"));
  }
  const auth = getAuth();


  try {
    const credential = await signInWithCustomToken(auth, token)

    const userAdmin = await admin.firestore()
      .doc(`users/${credential.user.uid}`)
      .get();

    const userAdminData = userAdmin.data()

    if (!userAdminData) {
      next(new HttpError(401, "Not authorized"));
    }

    req.body.admin = userAdminData;

    next()
  } catch (error) {
    next(error);
  }
};

export default Authorization;