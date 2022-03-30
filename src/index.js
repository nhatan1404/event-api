import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import { config } from 'dotenv';
import session from 'express-session';
import mongoose from 'mongoose';
import homeRouter from './home/home.route.js';
import authRouter from './auth/auth.route.js';
import PassportJWT from './common/strategies/jwt-strategy.js';
import eventRouter from './event/event.route.js';

const main = async () => {
  config();
  const app = express();
  const connectUrl = process.env.MONGO_URL;

  await mongoose.connect(connectUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  app
    .use(
      session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
      }),
    )
    .use(passport.initialize())
    .use(passport.session())
    .use(bodyParser.json())
    .use(
      bodyParser.urlencoded({
        extended: true,
      }),
    )
    .use(express.json());

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (obj, done) {
    done(null, obj);
  });

  PassportJWT(passport);

  app.use('/', homeRouter);
  app.use('/auth', authRouter);
  app.use('/event', eventRouter);

  const url = process.env.APP_URL;
  const port = process.env.PORT;

  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at ${url}:${port}`);
  });
};
main();
