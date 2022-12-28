import signupController from '../controllers/signup.js';
import Router from 'express';

console.log('Signup Router loads');

const router = Router();

const signupRouter = () => {
  console.log(
    'Signup Router function starts, Signup Controller should start here.....'
  );
  return router.post('/signup', signupController());
};

export default signupRouter;
