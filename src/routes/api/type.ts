import express from "express";

import { isValidBody, Authorization } from "../../helpers";
import { joiAPI } from "../../schemas/JoiAPI";
import {
  addType,
  getTypeById,
  removeType,
  updateType,
  getAllType,
} from "../../controllers/type";

const router = express.Router();

router.get("/:id", getTypeById);
router.delete("/:id", Authorization, removeType);
router.put("/:id", Authorization, isValidBody(joiAPI.addType), updateType);
router.post("/", Authorization, isValidBody(joiAPI.addType), addType);
router.get("/", getAllType);

export default router;
