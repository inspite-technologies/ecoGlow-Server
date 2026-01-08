import express from 'express';
import upload from '../config/multer.js'; // Import the new middleware
import { createBanner, updateBanner, getBanner } from '../controllers/bannerController.js';
import protectAdmin from './middleWare/adminMiddleWare.js';

const app = express.Router();

// No more diskStorage configuration here!

app.route("/")
  .post(upload.single("bannerImage"), protectAdmin, createBanner)
  .put(upload.single("bannerImage"), protectAdmin, updateBanner)
  .get(getBanner);

export default app;