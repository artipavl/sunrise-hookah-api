import { Response, Request, NextFunction } from "express";

interface Controller {
  (req: Request, res: Response): Promise<void>;
}

const ctrlWrapper = (controller: Controller) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res);
    } catch (error) {
      next(error);
    }
  };
};

export default ctrlWrapper;