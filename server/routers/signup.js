import express from 'express';
import dotenv from 'dotenv';
import signupController from '../controllers/signup.js';

dotenv.config();

const signupRouter = express.Router();

signupRouter.post('/', signupController);

export default signupRouter;
