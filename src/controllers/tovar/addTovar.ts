import { Request, Response } from "express";
import { ctrlWrapper, uploadImageToStorage } from "../../helpers";
import admin from "firebase-admin";
import { TovarType } from "../../Types";
import { unlinkSync } from "fs";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

export const addTovar = ctrlWrapper(async (req: Request, res: Response) => {
  const files = req.files;
  const tovar: TovarType = req.body;

  const newTovar = await admin.firestore().collection("tovars").add(tovar);

  const bucket = admin.storage().bucket();

  const fotos: string[] = [];
  const storage = getStorage();

  if (files && files instanceof Array) {
    for (let index = 0; index < files.length; index++) {
      await uploadImageToStorage(
        bucket,
        files[index],
        `tovars/${newTovar.id}/${files[index].originalname}`
      );
      fotos.push(
        await getDownloadURL(
          ref(storage, `tovars/${newTovar.id}/${files[index].originalname}`)
        )
      );
      unlinkSync(files[index].path);
    }
  }

  await admin
    .firestore()
    .collection("tovars")
    .doc(newTovar.id)
    .update({ fotos });

  res.status(201).json({ ...tovar, fotos, id: newTovar.id });
});
