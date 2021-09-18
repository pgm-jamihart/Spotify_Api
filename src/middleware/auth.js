/**
 * Authentication middleware based on jwt token
 */

// imports
import passport from 'passport';
import passportJWT from 'passport-jwt';
import dotenv from 'dotenv';

// init dotenv
dotenv.config();

// initialise passport strategy
const JwtStrategy = passportJWT.Strategy;
const { ExtractJwt } = passportJWT;

// define options
const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.JWT_UNIQUE_KEY;

// configuration passport jwt
passport.use(
  new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
    try {
      // console.info(`${jwt_payload.username} does an authenticated request`);
      return done(null, jwt_payload);
    } catch (error) {
      done(null, error);
    }
  }),
);

export default (req, res, next) => {
  if (req.baseUrl.includes('playlists' || 'users')) {
    // authenticate user
    passport.authenticate('jwt', { session: false }, (error, user, info) => {
      // check if there is error or fields of user are not correctly filled in
      // if so return an error
      // if not go to next function
      if (error || !user) {
        res.status(401).json({
          error: 'No permission!!!',
        });
      } else {
        next();
      }
    })(req, res, next);
  } else if (req.baseUrl.includes('tracks')) {
    passport.authenticate('jwt', { session: false }, (error, user, info) => {
      // check if user is admin or not
      // if user is not an admin then deny permission
      // if user is admin go to next function
      if (error || !user || user.admin == 'false' || user.admin == 0) {
        res.status(401).json({
          error: 'No permission!',
        });
      } else {
        next();
      }
    })(req, res, next);
  }
};
