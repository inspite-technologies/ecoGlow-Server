import express from "express";
import upload from "../config/multer.js";
import {
  addAboutUsSection,
  updateAboutUsSection,
  getAboutUsSection,
} from "../controllers/aboutUsController.js";
import protectAdmin from "./middleWare/adminMiddleWare.js";
const router = express.Router();

router.post("/", upload.any(),protectAdmin, addAboutUsSection);
router.put("/", upload.any(),protectAdmin, updateAboutUsSection);
router.get("/", getAboutUsSection);

export default router;
