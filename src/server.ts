import dotenv from "dotenv";
dotenv.config();
import { initializeApp, cert } from "firebase-admin/app";
import {
  getFirestore,
  // Timestamp,
  // FieldValue,
  // Filter,
} from "firebase-admin/firestore";

import app from "./app";
const PORT = process.env.PORT;

const serviceAccount = JSON.parse(
  JSON.stringify({
    type: process.env.type,
    project_id: process.env.project_id,
    private_key: process.env.private_key,
    client_email: process.env.client_email,
    client_id: process.env.client_id,
    auth_uri: process.env.auth_uri,
    token_uri: process.env.token_uri,
    auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
    client_x509_cert_url: process.env.client_x509_cert_url,
    universe_domain: process.env.universe_domain,
  })
);

initializeApp({
  credential: cert(serviceAccount),
  databaseURL:
    "https://sunrise-hookah-default-rtdb.europe-west1.firebasedatabase.app",
});

async function start() {
  try {
    await app.listen(PORT, function () {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();

const db = getFirestore();
const User = db.collection("users");

const Collection = {
  User,
};
export default Collection;
