import express from 'express';
import dotenv from 'dotenv';
import saveController from '../controllers/save.js';

dotenv.config();

const saveRouter = express.Router();

saveRouter.post('/', saveController);

export default saveRouter;
