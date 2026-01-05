import { createPackages,updatePackages,getPackages } from "../controllers/packagesController.js";
import express from "express";
import multer from "multer";
import protectAdmin from "./middleWare/adminMiddleWare.js";

const app = express.Router();
// ---------------- MULTER ----------------
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // Ensure 'uploads' folder exists in root
    },
    filename: function (req, file, cb) {
        // Use Date.now() to ensure unique filenames
        cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, '-'));
    }
});
const upload = multer({ storage: storage });
// ---------------- ROUTES ----------------
app.route("/").post(upload.any(),protectAdmin, createPackages);
app.route("/").put(upload.any(),protectAdmin,updatePackages);
app.route("/").get(getPackages);
export default app;