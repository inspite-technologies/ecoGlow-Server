import { createFaqPage,getFaqPage,updateFaqPage } from "../controllers/faqController.js";
import protectAdmin from "./middleWare/adminMiddleWare.js";
import express from "express";
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
app.route("/").post(upload.any(),protectAdmin, createFaqPage);
app.route("/").put(upload.any(),protectAdmin, updateFaqPage);
app.route("/").get(getFaqPage);
export default app;