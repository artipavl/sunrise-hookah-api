import { Request } from "express";
import multer, { FileFilterCallback } from "multer";
import path from "path";

const tempDir = path.join(__dirname, "../", "temp");

// type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (
    _req: Request,
    file: Express.Multer.File,
    cb: FileNameCallback
  ) => {
    cb(null, file.originalname);
  },
});

export const fileFilter = (
  _request: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback
): void => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

export const upload = multer({
  storage: multerConfig,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 2, // Максимальний розмір файлу: 5MB
  },
});
