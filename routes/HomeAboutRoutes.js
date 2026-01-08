import express from "express";
import upload from "../config/multer.js"; // Import the new middleware
import { createHomeAboutSection, updateHomeAbout, getHomeAboutSection } from "../controllers/HomeAboutController.js";
import protectAdmin from "./middleWare/adminMiddleWare.js";

const app = express.Router();

app.route("/").post(upload.any(), protectAdmin, createHomeAboutSection);
app.route("/").put(upload.any(), protectAdmin, updateHomeAbout);
app.route("/").get(getHomeAboutSection);

export default app;