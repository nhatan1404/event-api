import { Router } from 'express';
import adminMiddleware from '../common/middlewares/admin.middleware.js';
import authMiddleware from '../common/middlewares/auth.middleware.js';
import checkValidId from '../common/middlewares/checkValidId.middleware.js';
import validatorMiddleware from '../common/middlewares/validator.middleware.js';
import {
  createUser,
  deleteUser,
  getAllUsers,
  getListEvent,
  showById,
  updateUser,
} from './user.controller.js';
import { UserService } from './user.service.js';
import createUserSchema from './validators/createUser.validator.js';
import updateUserSchema from './validators/updateUser.validator.js';

const userRouter = Router();

userRouter.get('/', authMiddleware, adminMiddleware, getAllUsers);
userRouter.get(
  '/:id',
  authMiddleware,
  adminMiddleware,
  checkValidId(UserService),
  showById,
);
userRouter.post(
  '/',
  authMiddleware,
  adminMiddleware,
  validatorMiddleware(createUserSchema),
  createUser,
);
userRouter.put(
  '/:id',
  authMiddleware,
  adminMiddleware,
  checkValidId(UserService),
  validatorMiddleware(updateUserSchema),
  updateUser,
);

userRouter.delete(
  '/:id',
  authMiddleware,
  adminMiddleware,
  checkValidId(UserService),
  deleteUser,
);

userRouter.get('/events', authMiddleware, getListEvent);

export default userRouter;
