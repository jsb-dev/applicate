import express from 'express';
import dotenv from 'dotenv';
import getDocuments from '../utils/getDocuments.js';
import getCollaborators from '../utils/getCollaborators.js';

dotenv.config();

const utilsRouter = express.Router();

utilsRouter.get('/documents', getDocuments);
utilsRouter.post('/collaborators', getCollaborators);

export default utilsRouter;
