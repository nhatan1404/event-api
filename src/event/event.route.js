import { Router } from 'express';
import checkValidId from '../common/middlewares/checkValidId.middleware.js';
import {
  createEvent,
  deleteEvent,
  getAllEvent,
  showById,
  updateEvent,
  joinEvent,
  clearAllData,
  getListEventByUserId,
  getListUserByEventId,
} from './event.controller.js';
import validator from '../common/middlewares/validator.middleware.js';
import createEventSchema from './validators/createEvent.validator.js';
import updateEventSchema from './validators/updateEvent.validator.js';
import joinSchema from './validators/joinEvent.validator.js';
import authMiddleware from '../common/middlewares/auth.middleware.js';
import adminMiddleware from '../common/middlewares/admin.middleware.js';
import uploadMiddleware from '../common/middlewares/upload.middleware.js';

const eventRouter = Router();

eventRouter.get('/', getAllEvent);

eventRouter.get(
  '/user/:id',
  authMiddleware,
  checkValidId,
  getListEventByUserId,
);
eventRouter.post(
  '/',
  authMiddleware,
  adminMiddleware,
  validator(createEventSchema),
  uploadMiddleware.single('image'),
  createEvent,
);

eventRouter.get('/:id', checkValidId, showById);
eventRouter.get(
  ':id/users',
  authMiddleware,
  adminMiddleware,
  checkValidId,
  getListUserByEventId,
);
eventRouter.put(
  '/:id',
  authMiddleware,
  adminMiddleware,
  validator(updateEventSchema),
  checkValidId,
  updateEvent,
);

eventRouter.put(
  '/join/:id',
  authMiddleware,
  checkValidId,
  validator(joinSchema),
  joinEvent,
);

eventRouter.delete(
  '/:id',
  authMiddleware,
  adminMiddleware,
  checkValidId,
  deleteEvent,
);

eventRouter.get('/clear', clearAllData);

export default eventRouter;
