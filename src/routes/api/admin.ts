import express from "express";

import {
  registers,
  login,
  current,
  logout,
  getAdmins,
  removeAdmin,
} from "../../controllers/admin";
import { isValidBody, Authorization } from "../../helpers";
import { joiAPI } from "../../schemas/JoiAPI";
const router = express.Router();

router.get("/all", Authorization, getAdmins);

router.post(
  "/add",
  isValidBody(joiAPI.registerSchema),
  Authorization,
  registers
);

router.patch("/current", Authorization, current);
router.patch("/", isValidBody(joiAPI.loginSchema), login);
router.patch("/logout", Authorization, logout);
router.delete("/:id", Authorization, removeAdmin);

export default router;
