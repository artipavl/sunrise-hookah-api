import dotenv from "dotenv";
import admin from "firebase-admin";
dotenv.config();

import app from "./app";
import serviceAccount from "./etc/secrets/serviceAccount.json";

const PORT = process.env.PORT;

// const serviceAccount = {
//   type: process.env.type,
//   project_id: process.env.project_id,
//   private_key: process.env.private_key,
//   client_email: process.env.client_email,
//   client_id: process.env.client_id,
//   auth_uri: process.env.auth_uri,
//   token_uri: process.env.token_uri,
//   auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
//   client_x509_cert_url: process.env.client_x509_cert_url,
//   universe_domain: process.env.universe_domain,
// };

async function start() {
  try {
    await admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
      databaseURL:
        "https://sunrise-hookah-default-rtdb.europe-west1.firebasedatabase.app",
    });
    await app.listen(PORT, function () {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();

export default admin;
