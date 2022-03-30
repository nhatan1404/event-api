import { Router } from 'express';
import passport from 'passport';
import { handleLogin, handleRegister, getProfile } from './auth.controller.js';

const authRouter = Router();

authRouter.post('/login', handleLogin);

authRouter.post('/register', handleRegister);

authRouter.get('/profile', passport.authenticate('jwt'), getProfile);

export default authRouter;
