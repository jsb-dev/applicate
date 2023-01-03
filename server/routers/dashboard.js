import express from 'express';
import dashboardAuth from '../middleware/dashboardAuth.js';

const dashboardRouter = express.Router();

dashboardRouter.get('/', dashboardAuth);

export default dashboardRouter;
