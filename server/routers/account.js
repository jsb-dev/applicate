import express from 'express';
import dotenv from 'dotenv';
import signupController from '../controllers/account/signup.js';
import loginController from '../controllers/account/login.js';
import logoutController from '../controllers/account/logout.js';

dotenv.config();

const accountRouter = express.Router();

accountRouter.post('/signup', signupController);
accountRouter.post('/login', loginController);
accountRouter.post('/logout', logoutController);

export default accountRouter;
