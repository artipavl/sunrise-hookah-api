import { Request, Response, NextFunction } from "express";

const convertJsonBodyTovar = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const { tovar } = req.body;
  const newTovat = JSON.parse(tovar);
  req.body = newTovat;
  next();
};

export default convertJsonBodyTovar;
