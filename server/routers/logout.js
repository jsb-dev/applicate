import express from 'express';
import authMiddleware from '../middleware/auth.js';
import logoutController from '../controllers/logout.js';

const logoutRouter = express.Router();

// Set up the logout route and apply the auth middleware
logoutRouter.post('/', authMiddleware, logoutController);

export default logoutRouter;
