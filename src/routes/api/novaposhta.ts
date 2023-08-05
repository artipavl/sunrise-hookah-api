import express from "express";

import { joiAPI } from "../../schemas/JoiAPI";
import { getWarehouses, searchSettlements } from "../../controllers/novaposhta";
import { isValidBody } from "../../helpers";

const router = express.Router();

router.get(
  "/searchSettlements",
  isValidBody(joiAPI.novapostaGetCity),
  searchSettlements
);

router.get(
  "/getWarehouses",
  isValidBody(joiAPI.novapostagetWarehouses),
  getWarehouses
);

export default router;
