import Banner from '../models/bannerSchema.js';


const createBanner = async (req, res) => {
  try {
    // 1. Singleton Check: Prevent duplicates
    const existing = await Banner.findOne();
    if (existing) {
      return res.status(400).json({ success: false, message: "Banner already exists. Use Update." });
    }
    // 2. Extract text and image
    const { text } = req.body;
    let imagePath = null;
    if (req.files) {
      const filesArray = Array.isArray(req.files) ? req.files : Object.values(req.files).flat();
      const file = filesArray.find(f => f.fieldname === 'bannerImage');
      if (file) imagePath = file.path;
    }
    // 3. Create and Save
    const newBanner = new Banner({
      text,
      image: imagePath
    });
    await newBanner.save();
    res.status(201).json({ success: true, message: "Banner created successfully", data: newBanner });
  } catch (error) {
    console.error("Create Banner Error:", error);
    res.status(500).json({ success: false, message: "Failed to create Banner", error: error.message });
  }
};

const updateBanner = async (req, res) => {
  try {
    // console.log("Body:", req.body);     
    // console.log("File:", req.file);     

    const banner = await Banner.findOne();
    if (!banner) return res.status(404).json({ success: false, message: "Banner not found" });

    if (req.body.text) banner.text = req.body.text;
    if (req.file) banner.image = req.file.path; // save path

    await banner.save();

    res.status(200).json({ success: true, message: "Banner updated successfully", data: banner });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to update banner", error: err.message });
  }
};


const getBanner = async (req, res) => {
  try {
    const banner = await Banner.findOne();
    if (!banner) {
      return res.status(404).json({ success: false, message: "Banner not found" });
    }
    res.status(200).json({ success: true, data: banner });
  }
    catch (error) {
    console.error("Get Banner Error:", error);
    res.status(500).json({ success: false, message: "Failed to get Banner", error: error.message });
  } 
};

export { createBanner, updateBanner, getBanner };