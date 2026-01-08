import { createFaqPage, getFaqPage, updateFaqPage } from "../controllers/faqController.js";
import protectAdmin from "./middleWare/adminMiddleWare.js";
import express from "express";
import upload from "../config/multer.js"; // Import the new middleware

const app = express.Router();

app.route("/").post(upload.any(), protectAdmin, createFaqPage);
app.route("/").put(upload.any(), protectAdmin, updateFaqPage);
app.route("/").get(getFaqPage);

export default app;