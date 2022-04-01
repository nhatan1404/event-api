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
import validatorMiddleware from '../common/middlewares/validator.middleware.js';
import createEventSchema from './validators/createEvent.validator.js';
import updateEventSchema from './validators/updateEvent.validator.js';
import joinSchema from './validators/joinEvent.validator.js';
import authMiddleware from '../common/middlewares/auth.middleware.js';
import adminMiddleware from '../common/middlewares/admin.middleware.js';
import uploadMiddleware from '../common/middlewares/upload.middleware.js';
import { UserService } from '../user/user.service.js';
import { EventService } from './event.service.js';

const eventRouter = Router();

eventRouter.get('/', getAllEvent);

eventRouter.get(
  '/user/:id',
  authMiddleware,
  checkValidId(UserService),
  getListEventByUserId,
);

eventRouter.post(
  '/',
  authMiddleware,
  adminMiddleware,
  validatorMiddleware(createEventSchema),
  uploadMiddleware.single('image'),
  createEvent,
);

eventRouter.get(
  '/:id/users',
  authMiddleware,
  adminMiddleware,
  checkValidId(EventService),
  getListUserByEventId,
);

eventRouter.get('/:id', checkValidId(EventService), showById);
eventRouter.put(
  '/:id',
  authMiddleware,
  adminMiddleware,
  validatorMiddleware(updateEventSchema),
  checkValidId(EventService),
  updateEvent,
);

eventRouter.put(
  '/join/:id',
  authMiddleware,
  checkValidId(EventService),
  validatorMiddleware(joinSchema),
  joinEvent,
);

eventRouter.delete(
  '/:id',
  authMiddleware,
  adminMiddleware,
  checkValidId(EventService),
  deleteEvent,
);

eventRouter.get('/clear', clearAllData);

export default eventRouter;
