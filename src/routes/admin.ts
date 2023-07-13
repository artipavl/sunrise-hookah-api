import express from "express";

import { register } from "../controllers/admin/auth";
import { isValidBody } from "../helpers";
import { joiAPI } from "../schemas/JoiAPI";

const routerOne = express.Router();

routerOne.post('/', isValidBody(joiAPI.registerSchema), register)

export default routerOne