import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import { config } from 'dotenv';
import session from 'express-session';
import cors from 'cors';
import mongoose from 'mongoose';
import homeRouter from './home/home.route.js';
import authRouter from './auth/auth.route.js';
import PassportJWT from './common/strategies/jwt-strategy.js';
import eventRouter from './event/event.route.js';
import AllFilterExceptions from './common/filters/all-exeptions.filter.js';
import userRouter from './user/user.route.js';
import path from 'path';

const main = () => {
  config();
  const app = express();
  const __dirname = path.resolve();

  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log('Successfully connect to MongoDB.'))
    .catch((err) => console.error('Connection error', err));

  app
    .use(
      session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
      }),
    )
    .use(cors())
    .use(passport.initialize())
    .use(passport.session())
    .use(express.json())
    .use(bodyParser.json())
    .use(
      bodyParser.urlencoded({
        extended: true,
      }),
    )
    .use(AllFilterExceptions)
    .use('/public', express.static(path.join(__dirname, 'public')));

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
  app.use('/user', userRouter);
  app.use((req, res, next) => {
    res.notFound();
  });

  const url = process.env.APP_URL;
  const port = process.env.PORT;

  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at ${url}:${port}`);
  });
};
main();
