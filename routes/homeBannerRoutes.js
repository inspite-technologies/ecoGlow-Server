import express from 'express';
import multer from 'multer';
import { createBanner, updateBanner, getBanner } from '../controllers/bannerController.js';
import protectAdmin from './middleWare/adminMiddleWare.js';
const app = express.Router();

app.use((req, res, next) => {
  console.log("Content-Type:", req.headers["content-type"]);
  next();
});

// ---------------- MULTER ----------------
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // folder to store files
    }
    ,
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
const upload = multer({ storage: storage });

app.route("/")
  .post(upload.single("bannerImage"),protectAdmin, createBanner)
  .put(upload.single("bannerImage"),protectAdmin, updateBanner)
  .get(getBanner);

export default app;