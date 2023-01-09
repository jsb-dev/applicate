import express from 'express';
import dotenv from 'dotenv';
import createController from '../controllers/document/create.js';
import loadController from '../controllers/document/load.js';
import saveController from '../controllers/document/save.js';

dotenv.config();

const documentRouter = express.Router();

documentRouter.post('/create', createController);
documentRouter.post('/load', loadController);
documentRouter.post('/save', saveController);

export default documentRouter;
