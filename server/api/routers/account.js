import express from 'express';
import dotenv from 'dotenv';
import signupController from '../controllers/account/signup.js';
import loginController from '../controllers/account/login.js';
import logoutController from '../controllers/account/logout.js';
import passwordController from '../controllers/account/password.js';
import emailController from '../controllers/account/email.js';
import contactController from '../controllers/account/contact.js';
import recoverController from '../controllers/account/recover.js';
import resetAuthController from '../controllers/account/resetAuth.js';
import resetPasswordController from '../controllers/account/resetPassword.js';
import deleteController from '../controllers/account/delete.js';

dotenv.config();

const accountRouter = express.Router();

accountRouter.post('/signup', signupController);
accountRouter.post('/login', loginController);
accountRouter.post('/logout', logoutController);
accountRouter.post('/password', passwordController);
accountRouter.post('/email', emailController);
accountRouter.post('/contact', contactController);
accountRouter.post('/recover', recoverController);
accountRouter.post('/resetAuth', resetAuthController);
accountRouter.post('/resetPass', resetPasswordController);
accountRouter.post('/delete', deleteController);

export default accountRouter;
