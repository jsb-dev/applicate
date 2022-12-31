import passport from 'passport';

const googleAuthMiddleware = passport.authenticate('google', {
  scope: ['email'],
});

export default googleAuthMiddleware;
