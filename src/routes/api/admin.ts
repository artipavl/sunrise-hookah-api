import express from "express";

import { registers, login, current, logout } from "../../controllers/admin";
import { isValidBody, Authorization } from "../../helpers";
import { joiAPI } from "../../schemas/JoiAPI";

const router = express.Router();

router.post("/", isValidBody(joiAPI.registerSchema), registers);
router.patch("/current", Authorization, current);
router.patch("/", isValidBody(joiAPI.loginSchema), login);
router.patch("/logout", Authorization, logout);


export default router;
