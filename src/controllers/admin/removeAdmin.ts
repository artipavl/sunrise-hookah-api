import { Request, Response } from "express";
import admin from "firebase-admin";
import { ctrlWrapper } from "../../helpers";

export const removeAdmin = ctrlWrapper(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { admin: adminUser } = req.body.admin;

  if (adminUser !== "root") {
    res.status(400).json("Bad Request");
  }

  const user = admin.firestore().collection("users").doc(id);

  const getUser = (await user.get()).data();

  if (!getUser) {
    res.status(400).json("Bad Request");
    return;
  }

  await user.delete();
  admin.auth().deleteUser(id);

  res.json("OK");
});
