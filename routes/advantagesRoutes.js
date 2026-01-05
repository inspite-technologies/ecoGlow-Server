import express from 'express';
import multer from 'multer';
import { saveAdvantagesPage,getAdvantagesPage } from '../controllers/advantagesController.js';
import protectAdmin from './middleWare/adminMiddleWare.js';
const app = express.Router();

// ---------------- MULTER ----------------
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // folder to store files
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
const upload = multer({ storage: storage });

// ---------------- ROUTES ----------------
app.route("/").post(upload.any(),protectAdmin,saveAdvantagesPage);
app.route("/").get(protectAdmin,getAdvantagesPage);

export default app;