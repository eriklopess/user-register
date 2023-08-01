import { Router } from 'express';
import UserController from '../controllers/User.controller';
import idValidator from '../middleware/idValidator';

const router = Router();

const userController = new UserController();

router.get('/', userController.find);
router.get('/:id', idValidator, userController.findOne);
router.post('/', userController.create);
router.put('/:id', idValidator, userController.update);
router.delete('/:id', idValidator, userController.delete);

export default router;
