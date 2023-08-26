import express from 'express';

import { isValidBody, Authorization } from '../../helpers';
import { joiAPI } from '../../schemas/JoiAPI';
import { addType, getTypeById, removeType, updateType, getAllType } from '../../controllers/type';

const router = express.Router();

router.get('/:id', getTypeById);
router.delete('/:id', Authorization, removeType);
router.put('/:id', isValidBody(joiAPI.addType), Authorization, updateType);
router.post('/', isValidBody(joiAPI.addType), Authorization, addType);
router.get('/', getAllType);

export default router;
