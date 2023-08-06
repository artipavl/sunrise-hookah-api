import express from "express";

import { joiAPI } from "../../schemas/JoiAPI";
import { getWarehouses, searchSettlements } from "../../controllers/novaposhta";
import { isValidBody } from "../../helpers";

const router = express.Router();

router.post(
  "/searchSettlements",
  isValidBody(joiAPI.novapostaGetCity),
  searchSettlements
);

router.post(
  "/getWarehouses",
  isValidBody(joiAPI.novapostagetWarehouses),
  getWarehouses
);

export default router;
