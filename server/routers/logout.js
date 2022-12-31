import express from 'express';
import authLogoutMiddleware from '../middleware/authLogout.js';
import logoutController from '../controllers/logout.js';

const logoutRouter = express.Router();

// Set up the logout route and apply the auth middleware
logoutRouter.post('/', authLogoutMiddleware, logoutController);

export default logoutRouter;
