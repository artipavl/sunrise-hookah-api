import { Request, Response } from "express"; 
import { ctrlWrapper } from "../../helpers"; 

export const current = ctrlWrapper(async (req: Request, res: Response) => {
    const { admin } = req.body;
    delete admin?.token;
  
    res.json({
      user: admin,
    });
  });