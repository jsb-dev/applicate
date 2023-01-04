import express from 'express';
import dashboardAuth from '../controllers/dashboard.js';

const dashboardRouter = express.Router();

dashboardRouter.get('/', dashboardAuth, (req, res) => {
  // Check the user's authentication status and return a boolean value
  res.send(req.user ? true : false);
});

export default dashboardRouter;
