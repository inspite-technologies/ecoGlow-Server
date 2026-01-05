import { log } from "console";
import HomeAbout from "../models/homeAboutSchema.js";
import fs from "fs";
import path from "path";

// Helper to get file path from req.files array
const getFilePath = (files, fieldName) => {
  if (!files) return null;
  const filesArray = Array.isArray(files) ? files : Object.values(files).flat();
  const file = filesArray.find(f => f.fieldname === fieldName);
  return file ? file.path : null;
};

// --- CREATE ---
const createHomeAboutSection = async (req, res) => {
  try {
    // 1. Singleton Check
    const existing = await HomeAbout.findOne();
    if (existing) {
      return res.status(400).json({ success: false, message: "Section already exists. Use Update." });
    }

    const { title, description } = req.body;
    
    // 2. Parse Items (JSON string)
    let items = [];
    if (req.body.items) {
      items = JSON.parse(req.body.items);
    }

    // 3. Create Document
    const newHomeAbout = new HomeAbout({
      title,
      description,
      sectionImage: getFilePath(req.files, 'sectionImage'),
      valuesCommonImage: getFilePath(req.files, 'valuesCommonImage'),
      items: items // No icon processing needed
    });

    await newHomeAbout.save();
    res.status(201).json({ success: true, message: "Created successfully", data: newHomeAbout });

  } catch (error) {
    console.error("Create Error:", error);
    res.status(500).json({ success: false, message: "Failed to create", error: error.message });
  }
};

const updateHomeAbout = async (req, res) => {
  try {
    const {
      _id,
      heroHighlightText,
      heroTitle,
      heroParagraphs,
      items
    } = req.body;

    const updateData = {
      heroHighlightText,
      heroTitle,
      heroParagraphs: heroParagraphs
        ? JSON.parse(heroParagraphs)
        : [],
      items: items ? JSON.parse(items) : []
    };

    // image handling
    if (req.files?.valuesCommonImage?.[0]) {
      updateData.valuesCommonImage =
        req.files.valuesCommonImage[0].path;
    }

    const updated = await HomeAbout.findOneAndUpdate(
      _id ? { _id } : {},
      updateData,
      { new: true, upsert: true }
    );

    res.status(200).json(updated);
  } catch (error) {
    console.error("About update error:", error);
    res.status(500).json({ message: "Update failed" });
  }
};

// --- GET ---
const getHomeAboutSection = async (req, res) => {
  try {
    const homeAbout = await HomeAbout.findOne();
    if (!homeAbout) {
      return res.status(404).json({ success: false, message: "Section not found" });
    }
    res.status(200).json({ success: true, data: homeAbout });
  } catch (error) {
    console.error("Get Error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch", error: error.message });
  }
};

export { createHomeAboutSection, updateHomeAbout, getHomeAboutSection };