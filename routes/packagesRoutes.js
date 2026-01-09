import express from "express";
// Import the NEW unified middleware
import upload from "../config/multer.js"; 
import { createPackages, updatePackages, getPackages } from "../controllers/packagesController.js";
import protectAdmin from "./middleWare/adminMiddleWare.js";

const app = express.Router();


app.route("/").post(upload.any(), protectAdmin, createPackages);
app.route("/").put(upload.any(), protectAdmin, updatePackages);
app.route("/").get(getPackages);

export default app;