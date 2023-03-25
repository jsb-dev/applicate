import express from 'express';
import dotenv from 'dotenv';
import getDocuments from '../api/getDocuments.js';
import getCollaborators from '../api/utils/getCollaborators.js';

dotenv.config();

const apiRouter = express.Router();

apiRouter.get('/documents', getDocuments);
apiRouter.post('/collaborators', getCollaborators);

export default apiRouter;
