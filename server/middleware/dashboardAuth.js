import { configureJWTStrategy } from '../config/jwtStrategy.js';

const dashboardAuth = async (req, res, next) => {
  console.log('Checking for authorization header');
  if (req.headers.authorization) {
    // If the incoming request has the 'Authorization' header, configure the JWT strategy
    try {
      configureJWTStrategy(passport);
      // Continue with the request
      return passport.authenticate('jwt', { session: false })(
        req,
        res.render('dashboard', { user: req.user }),
        next
      );
    } catch (error) {
      // If configureJWTStrategy fails, redirect the user to the root directory
      return res.redirect('/');
    }
  } else {
    // If the incoming request does not have the 'Authorization' header, redirect the user to the root directory
    return res.redirect('/');
  }
};

export default dashboardAuth;
