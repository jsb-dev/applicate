import express from 'express';
import dotenv from 'dotenv';
import getDocuments from '../api/getDocuments.js';

dotenv.config();

const apiRouter = express.Router();

apiRouter.get('/documents', getDocuments);

export default apiRouter;
