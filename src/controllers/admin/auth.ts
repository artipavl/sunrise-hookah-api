import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { ctrlWrapper } from "../../helpers";

import e from "../../server";

interface RequestBody {
  email: string;
  password: string;
}

export const register = ctrlWrapper(async (req: Request, res: Response) => {
  const { email, password }: RequestBody = req.body;

  const hashedPassword = await bcrypt.hash(password, 12);

  const auth = await e.admin.auth().createUser({
    email,
    password: hashedPassword,
    emailVerified: false,

    disabled: false,
  });
  console.log(auth);
  await e.User.set({
    role: "supper",
    userid: auth.uid,
  });

  res.json({ email: auth.email });
});
