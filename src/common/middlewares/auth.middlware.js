import passport from 'passport';

const authMiddleware = () => {
  return passport.authenticate('jwt');
};

export default authMiddleware;
