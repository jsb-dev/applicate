import express from 'express';
import dotenv from 'dotenv';
import loadController from '../controllers/load.js';

dotenv.config();

const loadRouter = express.Router();

loadRouter.post('/', loadController);

export default loadRouter;
