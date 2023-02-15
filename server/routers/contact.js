import express from 'express';
import dotenv from 'dotenv';
import enquiryController from '../controllers/contact/enquiry.js';

dotenv.config();

const contactRouter = express.Router();

contactRouter.post('/enquiry', enquiryController);

export default contactRouter;
