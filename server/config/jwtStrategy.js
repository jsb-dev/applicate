import pkg from 'passport-jwt';
import User from '../database/models/user.js';
import dotenv from 'dotenv';

const { Strategy: JWTStrategy, ExtractJWT } = pkg;

dotenv.config();

const configureJWTStrategy = (passport) => {
  console.log('Configuring JWT strategy');
  // Set up the JWT strategy
  passport.use(
    new JWTStrategy(
      {
        // Configure the JWT strategy
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
      },
      (payload, done) => {
        // If the token is valid, find the user associated with the token
        User.findById(payload.id, (error, users) => {
          const user = users[0];
          if (error) return done(error, false);
          if (user) return done(null, user);
          return done(null, false);
        });
      }
    )
  );
};

export { configureJWTStrategy };
