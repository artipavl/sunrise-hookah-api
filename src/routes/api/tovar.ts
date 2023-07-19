import express from "express";

import {
  addTovar,
  getTovarByType,
  getTovarByid,
} from "../../controllers/tovar";
import { upload } from "../../helpers";
import { isValidBody, convertJsonBodyTovar } from "../../helpers";
import { joiAPI } from "../../schemas/JoiAPI";

const router = express.Router();

router.get("/type/:id", getTovarByType);
router.get("/:id", getTovarByid);

// router.use(bodyParser.urlencoded({ extended: true }));
router.post(
  "/",
  upload.array("files", 5),
  convertJsonBodyTovar,
  isValidBody(joiAPI.addTovar),
  addTovar
);

export default router;
