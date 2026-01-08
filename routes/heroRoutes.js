import express from "express";
import upload from "../config/multer.js"; // Import the new middleware
import { createHero, updateHero, getHero } from "../controllers/heroController.js";
import protectAdmin from "./middleWare/adminMiddleWare.js";

const app = express.Router();

app.route("/").post(upload.any(), protectAdmin, createHero);
app.route("/").put(upload.any(), protectAdmin, updateHero);
app.route("/").get(getHero);

export default app;