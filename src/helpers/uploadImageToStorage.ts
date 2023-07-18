import { Bucket } from "@google-cloud/storage";
import fs from "fs";

export const uploadImageToStorage = async (
  bucket: Bucket,
  myfile: Express.Multer.File,
  destinationPath: string
): Promise<string> => {
  const file = bucket.file(destinationPath);

  // Отримуємо зчитувач файлу
  const fileStream = fs.createReadStream(myfile.path);

  // Створюємо потік для завантаження файлу
  const uploadStream = file.createWriteStream({
    metadata: {
      contentType: myfile.mimetype, // Замініть на відповідний тип зображення
    },
  });

  // Реалізація Promise для відстеження завершення завантаження
  return new Promise((resolve, reject) => {
    uploadStream.on("error", (error) => {
      console.error("Помилка під час завантаження зображення:", error);
      reject(error);
    });

    uploadStream.on("finish", () => {
      // Отримуємо посилання на завантажене зображення
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${file.name}`;
      resolve(publicUrl);
    });

    // Завантажуємо зчитувач файлу до потоку завантаження
    fileStream.pipe(uploadStream);
  });
};
