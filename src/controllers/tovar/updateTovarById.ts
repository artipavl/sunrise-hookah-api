import { Request, Response } from "express";
import { ctrlWrapper } from "../../helpers";
import admin from "firebase-admin";
import { TovarType } from "../../Types";

export const updateTovarById = ctrlWrapper(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const tovar: TovarType = req.body;

    const get = await admin.firestore().collection("tovars").doc(id).get();

    if (!get.data()) {
      res.status(400).json("Bad Request");
      return;
    }

    await admin
      .firestore()
      .collection("tovars")
      .doc(id)
      .update({ ...tovar });

    res.status(201).json({ ...tovar, id });
  }
);
