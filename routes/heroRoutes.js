import express from "express";
import multer from "multer";
import {
  createHero,
  updateHero,
  getHero,
} from "../controllers/heroController.js";
import protectAdmin from "./middleWare/adminMiddleWare.js";
const app = express.Router();
// ---------------- MULTER ----------------
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // folder to store files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });
// ---------------- ROUTES ----------------
app.route("/").post(upload.any(),protectAdmin, createHero);
app.route("/").put(upload.any(),protectAdmin, updateHero);
app.route("/").get(getHero);
export default app;
