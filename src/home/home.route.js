import { Router } from 'express';
import { showHome } from './home.controller.js';

const homeRouter = Router();

homeRouter.get('/', showHome);

export default homeRouter;
