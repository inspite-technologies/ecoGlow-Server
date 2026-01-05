import express from 'express';
import multer from 'multer';
import { getMessagePage, saveMessagePage } from '../controllers/messageController.js';
import protectAdmin from './middleWare/adminMiddleWare.js';
const router = express.Router();

// --- MULTER CONFIG ---
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({ storage: storage });

// --- ROUTES ---
router.get('/',protectAdmin, getMessagePage);
router.post('/', upload.any(),protectAdmin,saveMessagePage); 

export default router;