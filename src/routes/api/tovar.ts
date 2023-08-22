import express from "express";

import {
  addTovar,
  getAllTovars,
  getPopulate,
  getTovarByType,
  getTovarByid,
  removeTovar,
  updateTovarById,
} from "../../controllers/tovar";
import { upload } from "../../helpers";
import {
  isValidBody,
  convertJsonBodyTovar,
  Authorization,
} from "../../helpers";
import { joiAPI } from "../../schemas/JoiAPI";

const router = express.Router();

router.get("/type/:id", getTovarByType);
router.get("/populate", getPopulate);
router.get("/:id", getTovarByid);
router.get('/', Authorization, getAllTovars);
router.delete("/:id", Authorization, removeTovar);

router.post(
  "/",
  Authorization,
  upload.array("files", 5),
  convertJsonBodyTovar,
  isValidBody(joiAPI.addTovar),
  addTovar
);

router.put(
  "/:id",
  // Authorization,
  upload.array("files", 5),
  convertJsonBodyTovar,
  isValidBody(joiAPI.updateTovar),
  updateTovarById
);

export default router;
