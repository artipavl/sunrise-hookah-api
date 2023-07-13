import { Request, Response } from "express";
import bcrypt from "bcrypt";
import admin from "../../server";
import { ctrlWrapper } from "../../helpers";


interface RequestBody {
  email: string;
  password: string;
}

export const register = ctrlWrapper(async (req: Request, res: Response) => {

  const { email, password }: RequestBody = req.body;

  const hashedPassword = await bcrypt.hash(password, 12);

  const auth = await admin.auth().createUser({
    email,
    password: hashedPassword,
    emailVerified: false,

    disabled: false,
  });
  console.log(auth);

  res.json({ email: auth.email });
});