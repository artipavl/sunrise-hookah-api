import { Response, Request, NextFunction } from "express";
import HttpError from "./HttpError";
import admin from "firebase-admin";
import { getAuth, signInWithCustomToken } from "firebase/auth";

const Authorization = async (req: Request, _: Response, next: NextFunction) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(new HttpError(401, "Not authorized"));
  }
  const auth = getAuth();

  try {
    const credential = await signInWithCustomToken(auth, token);

    const userAdmin = await admin.firestore()
      .doc(`users/${credential.user.uid}`)
      .get();

    const userAdminData = userAdmin.data()

    if (!userAdminData || !userAdminData?.token || userAdminData.token !== token) {
      next(new HttpError(401, "Not authorized"));
    }

    req.body.admin = userAdminData;
    req.body.auth = { uid: credential.user.uid };

    next()
  } catch (error) {
    next(error);
  }
};

export default Authorization;