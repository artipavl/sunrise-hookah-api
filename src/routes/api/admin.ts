import express from "express";

import { register } from "../../controllers/admin/auth";
import { isValidBody } from "../../helpers";
import { joiAPI } from "../../schemas/JoiAPI";

const router = express.Router();

router.post("/", isValidBody(joiAPI.registerSchema), register);

export default router;
