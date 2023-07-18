import express, { Request, Response } from "express";
import logger from "morgan";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import { adminRouter, typeRouter, tovarRouter } from "./routes/api";

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/", adminRouter);
app.use("/type", typeRouter);
app.use("/tovar", tovarRouter);

type ErrorType = Error & { status: number };

app.use((err: ErrorType, _req: Request, res: Response) => {
  const { message = "Internal Server Error", status = 500 } = err;
  res.status(status).json({ message });
});

export default app;
