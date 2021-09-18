/**
 * Registering the authentication endpoints
 */

// imports
import Express from 'express';
import passport from 'passport';
import passportLocal from 'passport-local';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import parseUser from '../users/parseUser.js';
import UsersDB from '../../lib/UsersDB.js';
import validatorMiddelware from '../../middleware/registerValidation.js';
import { checkSchema } from './registerCheckSchema.js';

// init dotenv
dotenv.config();

// init router
const app = Express.Router();

// Add json body parser
app.use(bodyParser.json());

// init user database
const userData = new UsersDB();

// init passport with loacalStrategy
const LocalStrategy = passportLocal.Strategy;
passport.use(
  new LocalStrategy(
    { usernameField: 'username', passwordField: 'password' },
    async (username, password, done) => {
      try {
        // get user by username from database
        const user = await userData.findOne(username);

        // check if user exists
        if (!user) {
          return done(null, false, { message: 'Invalid username!' });
        }

        // check if password is correct
        if (!(await isValidPassword(user, password))) {
          return done(null, false, { message: 'Incorrect password!' });
        }

        // Return the existing and authencticated user
        return done(null, user);
      } catch (e) {
        return done(e);
      }
    },
  ),
);

app.post('/login', (req, res) => {
  passport.authenticate('local', (error, user, info) => {
    if (error) {
      // if error gets called the authentication failed
      res.status(401).send(error);
    } else if (!user) {
      // if its not a user the authentication failed
      res.status(401).send(info);
    } else {
      // jwt token
      const jwtData = {
        id: user.id,
        username: user.username,
        email: user.email,
        admin: user.admin,
      };

      // Create and sign a jwt token
      const token = jwt.sign(jwtData, process.env.JWT_UNIQUE_KEY, {
        expiresIn: parseInt(process.env.JWT_LIFETIME),
      });

      // if great succes sent token in body
      res.status(200).json({
        succes: true,
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          admin: user.admin,
        },
      });
    }
  })(req, res);
});

app.post('/register',
  // Validation on register request
  checkSchema,
  // Finds the validation errors in the register request
  validatorMiddelware,
  (req, res) => {
    // if passed validation, parse and add to user Database
    const {
      name, username, email, admin, password,
    } = parseUser(req, res);
    bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUNDS)).then((hash) => {
      userData.add(name, username, email, admin, hash);
      res.status(200).send(hash);
    });
  });

const isValidPassword = async (user, password) => {
  // Compare the passwords if both are the same it's a Match!
  const match = await bcrypt.compare(password, user.password);
  return match;
};

export default app;
