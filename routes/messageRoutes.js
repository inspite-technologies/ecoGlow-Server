import express from 'express';
import upload from '../config/multer.js'; 
import { getMessagePage, saveMessagePage } from '../controllers/messageController.js';
import protectAdmin from './middleWare/adminMiddleWare.js';

const router = express.Router();

router.get('/', getMessagePage);
router.post('/', upload.any(), protectAdmin, saveMessagePage); 

export default router;