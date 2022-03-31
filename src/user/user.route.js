import { Router } from 'express';
import adminMiddleware from '../common/middlewares/admin.middleware.js';
import authMiddleware from '../common/middlewares/auth.middleware.js';
import checkValidId from '../common/middlewares/checkValidId.middleware.js';
import {
  createUser,
  deleteUser,
  getAllUsers,
  getListEvent,
  showById,
  updateUser,
} from './user.controller.js';

const userRouter = Router();

userRouter.get('/', authMiddleware, adminMiddleware, getAllUsers);
userRouter.get('/:id', authMiddleware, adminMiddleware, checkValidId, showById);
userRouter.post('/', authMiddleware, adminMiddleware, createUser);
userRouter.put(
  '/:id',
  authMiddleware,
  adminMiddleware,
  checkValidId,
  updateUser,
);
userRouter.delete(
  '/:id',
  authMiddleware,
  adminMiddleware,
  checkValidId,
  deleteUser,
);

userRouter.get('/events', authMiddleware, getListEvent);

export default userRouter;
