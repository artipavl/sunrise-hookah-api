// import admin from "firebase-admin";
import express from "express";
import logger from "morgan";
import cors from "cors";
import dotenv from "dotenv";

import admin from "./server";

dotenv.config();

const app = express();

// app.use(helmet());
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    const auth = await admin.auth().createUser({
      email,
      password,
      emailVerified: false,
      disabled: false,
    });
    console.log(auth);
  } catch (error) {
    console.log(error);
  }

  res.send("Hello World!");
});

module.exports = app;

export default app;
