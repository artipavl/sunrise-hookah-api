import express from "express";
import logger from "morgan";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import { adminRouter, typeRouter } from "./routes/api";

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/", adminRouter);
app.use("/type", typeRouter);

export default app;
