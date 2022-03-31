import passport from 'passport';

const authMiddleware = passport.authenticate('jwt');

export default authMiddleware;
