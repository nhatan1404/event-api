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
} from './event.controller.js';

const eventRouter = Router();
eventRouter.get('/', getAllEvent);
eventRouter.post('/', createEvent);
eventRouter.get('/:id', checkValidId, showById);
eventRouter.put('/:id', checkValidId, updateEvent);
eventRouter.put('/join/:id', checkValidId, joinEvent);
eventRouter.delete('/:id', checkValidId, deleteEvent);
eventRouter.get('/clear', clearAllData);

export default eventRouter;
