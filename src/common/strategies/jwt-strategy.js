import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { UserService } from '../../user/user.service.js';
import jwt from 'jsonwebtoken';

export default function PassportJWT(passport) {
  const opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = 'secret';
  passport.use(
    new JwtStrategy(opts, async function (payload, done) {
      const userService = new UserService();
      try {
        const user = await userService.findByEmail(payload.email);
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      } catch (error) {
        return done(error, false);
      }
    }),
  );
}
