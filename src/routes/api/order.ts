import express from "express";

import { joiAPI } from "../../schemas/JoiAPI";
import { isValidBody, Authorization } from "../../helpers";
import {
  getOrders,
  addOrder,
  updateOrder,
  removeOrder,
} from "../../controllers/order";

const router = express.Router();

router.post("/", isValidBody(joiAPI.addOrder), addOrder);

router.get("/", Authorization, getOrders);
router.put("/", isValidBody(joiAPI.Order), Authorization, updateOrder);
router.delete("/:id", Authorization, removeOrder);

export default router;
