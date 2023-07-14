import dotenv from "dotenv";
import admin from "firebase-admin";
// import fs from "fs";
dotenv.config();

import app from "./app";
// import serviceAccount from "./serviceAccount.json";
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

const admindb = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  databaseURL:
    "https://sunrise-hookah-default-rtdb.europe-west1.firebasedatabase.app",
});

const db = admin.database();

const ref = db.ref("server/saving-data/fireblog");

const User = ref.child("users");

async function start() {
  try {
    if (!admindb) {
      console.log(`serviceAccount faild`);
      return;
    }
    await app.listen(PORT, function () {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
const e = {
  admin: admindb,
  User,
};
export default e;
