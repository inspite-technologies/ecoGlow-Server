import express from "express";
import { createHomeAboutSection, updateHomeAbout, getHomeAboutSection } from "../controllers/HomeAboutController.js";
import protectAdmin from "./middleWare/adminMiddleWare.js";
import multer from "multer";
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
app.route("/").post(upload.any(),protectAdmin, createHomeAboutSection);
app.route("/").put(upload.any(),protectAdmin, updateHomeAbout);
app.route("/").get(getHomeAboutSection);
export default app;