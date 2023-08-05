import { Request, Response } from "express";
import axios from "axios";
import { ctrlWrapper } from "../../helpers";
const apiKey = process.env.NOVAPOSHTA_API_KEY;

export const searchSettlements = ctrlWrapper(
  async (req: Request, res: Response) => {

    const json = {
      apiKey,
      modelName: "Address",
      calledMethod: "searchSettlements",
      methodProperties: {
        // Page: "1",
        // FindByString: "київ",
        // Limit: "20",
        // Warehouse: "1",
        ...req.body,
      },
    };

    const response = await axios.get(
      "https://api.novaposhta.ua/v2.0/json/searchSettlements",
      { data: json }
    );
    
    res.json(response.data);
  }
);
