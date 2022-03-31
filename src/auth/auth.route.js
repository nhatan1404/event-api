import { Router } from 'express';
import authMiddleware from '../common/middlewares/auth.middlware.js';
import { handleLogin, handleRegister, getProfile } from './auth.controller.js';

import passport from 'passport';
const authRouter = Router();

authRouter.post('/login', handleLogin);

authRouter.post('/register', handleRegister);

authRouter.get('/profile', passport.authenticate('jwt'), getProfile);

export default authRouter;
