import dotenv from "dotenv";
import admin from "firebase-admin";
import { initializeApp } from "firebase/app";

import fs from "fs";
dotenv.config();

import app from "./app";

const PORT = process.env.PORT;



async function start() {
  try {
    const sourceFilePath = "/etc/secrets/serviceAccount.json";
    const sourceFilePathAuth = "/etc/secrets/firebaseConfig.json";
    const test = await fs.promises.readFile(sourceFilePath, "utf8");
    const testAuth = await fs.promises.readFile(sourceFilePathAuth, "utf8");
    const serviceAccount = JSON.parse(test);
    const firebaseConfig = JSON.parse(testAuth);
    if (!serviceAccount || !firebaseConfig) {
      console.log("serviceAccount === null");
      return;
    }
    await initializeApp(firebaseConfig);
    await admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
      databaseURL:
        "https://sunrise-hookah-default-rtdb.europe-west1.firebasedatabase.app",
      storageBucket: firebaseConfig.storageBucket,
    });

    await app.listen(PORT, function () {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
start();
