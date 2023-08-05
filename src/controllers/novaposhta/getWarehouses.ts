import { Request, Response } from "express";
import axios from "axios";
import { ctrlWrapper } from "../../helpers";

const apiKey = process.env.NOVAPOSHTA_API_KEY;

export const getWarehouses = ctrlWrapper(
  async (req: Request, res: Response) => {
    
    const json = {
      apiKey,
      modelName: "Address",
      calledMethod: "getWarehouses",
      methodProperties: {
        Limit: 50,
        Page: 1,
        Language: "UA",
        ...req.body,
      },
    };

    const response = await axios.get(
      "https://api.novaposhta.ua/v2.0/json/getWarehouses",
      { data: json }
    );
    res.json(response.data);
  }
);
