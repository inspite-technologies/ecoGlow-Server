import express from "express";
import { saveServicesPage,getServicesPage } from "../controllers/servicesHomeController.js";
import multer from "multer";
import protectAdmin from "./middleWare/adminMiddleWare.js";

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
app.route("/").get(protectAdmin,getServicesPage);
app.route("/").post(
  upload.fields([
    { name: "card1Image", maxCount: 1 },
    { name: "card2Image", maxCount: 1 },
  ]),protectAdmin,
  saveServicesPage
);


export default app;