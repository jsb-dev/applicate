import express from 'express';
import dotenv from 'dotenv';
import createController from '../controllers/create.js';

dotenv.config();

const createRouter = express.Router();

createRouter.post('/', createController);

export default createRouter;
