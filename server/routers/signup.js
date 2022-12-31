import express from 'express';
import googleAuthMiddleware from '../middleware/googleAuth.js';
import signupController from '../controllers/signup.js';
import googleSignupController from '../controllers/googleSignup.js';

const signupRouter = express.Router();

signupRouter.post('/', (req, res) => {
  if (req.query.code) {
    // If the user is logging in with Google
    // Invoke the Google OAuth middleware
    googleAuthMiddleware(req, res, () => {
      // If the middleware successfully authenticates the user, it will call this callback function
      googleSignupController(req, res);
    });
  } else {
    // If the user is signing up with an email and password
    signupController(req, res);
  }
});

export default signupRouter;
