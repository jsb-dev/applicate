import express from 'express';
import checkAuth from '../utils/checkAuth.js';

const checkAuthRouter = express.Router();

checkAuthRouter.get('/', checkAuth, (req, res) => {
  res.send(req.user ? true : false);
});

export default checkAuthRouter;
