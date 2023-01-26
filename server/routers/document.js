import express from 'express';
import dotenv from 'dotenv';
import createController from '../controllers/document/create.js';
import loadController from '../controllers/document/load.js';
import saveController from '../controllers/document/save.js';
import deleteController from '../controllers/document/delete.js';

dotenv.config();

const documentRouter = express.Router();

documentRouter.post('/create', createController);
documentRouter.post('/load', loadController);
documentRouter.post('/save', saveController);
documentRouter.post('/delete', deleteController);

export default documentRouter;
