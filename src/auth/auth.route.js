import { Router } from 'express';
import { handleLogin, handleRegister, getProfile } from './auth.controller.js';
import passport from 'passport';
import validator from '../common/middlewares/validator.middleware.js';
import loginSchema from './validators/login.validator.js';
import registerSchema from './validators/register.validator.js';

const authRouter = Router();

authRouter.post('/login', validator(loginSchema), handleLogin);

authRouter.post('/register', validator(registerSchema), handleRegister);

authRouter.get('/profile', passport.authenticate('jwt'), getProfile);

export default authRouter;
