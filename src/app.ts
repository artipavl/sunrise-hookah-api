import express from "express";
import type { ErrorRequestHandler } from "express";
import logger from "morgan";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import {
  adminRouter,
  typeRouter,
  tovarRouter,
  feedbackRouter,
  novaposhtaRouter,
  orderRouter,
} from "./routes/api";

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/", adminRouter);
app.use("/type", typeRouter);
app.use("/tovar", tovarRouter);
app.use("/feedback", feedbackRouter);
app.use("/novaposhta", novaposhtaRouter);
app.use("/order", orderRouter);


const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  const { message = "Internal Server Error", status = "500" } = err;
  res.status(status).json({ message }).end();
};

app.use(errorHandler);

export default app;
