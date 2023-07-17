import express from "express";

import { isValidBody } from "../../helpers";
import { joiAPI } from "../../schemas/JoiAPI";
import {
  addType,
  getTypeById,
  removeType,
  updateType,
} from "../../controllers/type";

const router = express.Router();

router.get("/:id", getTypeById);
router.delete("/:id", removeType);
router.put("/:id", isValidBody(joiAPI.addType), updateType);
router.post("/", isValidBody(joiAPI.addType), addType);

export default router;
