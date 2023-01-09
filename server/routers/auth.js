import express from 'express';
import checkAuth from '../auth/checkAuth.js';

const checkAuthRouter = express.Router();

checkAuthRouter.get('/', checkAuth, (req, res) => {
  res.send(req.user ? true : false);
});

export default checkAuthRouter;
