import { Router } from 'express';
import passport from 'passport';
import sendErrorsMessage from '../common/middlewares/sendErrorsMessage.middlware.js';
import { handleLogin, handleRegister, getProfile } from './auth.controller.js';
import loginSchema from './validators/login.validator.js';

const authRouter = Router();

authRouter.post('/login', loginSchema, sendErrorsMessage, handleLogin);

authRouter.post('/register', handleRegister);

authRouter.get('/profile', passport.authenticate('jwt'), getProfile);

export default authRouter;
