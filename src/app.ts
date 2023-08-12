import express, { Request, Response } from "express";
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

// type ErrorType = Error & { status: number };

app.use((err: Error, _req: Request, res: Response) => {
  const { message = "Internal Server Error" } = err;
  res.status(500).json({ message }).end();
});

export default app;
