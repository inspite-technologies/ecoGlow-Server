import MessagePage from "../models/messageSchema.js";

// --- GET ---
export const getMessagePage = async (req, res) => {
  try {
    const data = await MessagePage.findOne();
    // If no data exists yet, return empty object or null
    res.status(200).json({ success: true, data: data || null });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// --- SAVE (Create or Update) ---
export const saveMessagePage = async (req, res) => {
  try {
    const {
      mdTitle,
      mdMessage,
      mdName,
      connectTitle,
      connectSubtitle
    } = req.body;

    // Handle File Upload
    let mdPhotoPath = null;
    if (req.files && req.files.length > 0) {
      // Assuming single file upload for mdPhoto
      mdPhotoPath = req.files[0].path; 
    }

    // Try to find existing document
    let pageData = await MessagePage.findOne();

    if (pageData) {
      // UPDATE existing
      if (mdTitle) pageData.mdTitle = mdTitle;
      if (mdMessage) pageData.mdMessage = mdMessage;
      if (mdName) pageData.mdName = mdName;
      if (connectTitle) pageData.connectTitle = connectTitle;
      if (connectSubtitle) pageData.connectSubtitle = connectSubtitle;
      if (mdPhotoPath) pageData.mdPhoto = mdPhotoPath;
      
      await pageData.save();
    } else {
      // CREATE new
      pageData = new MessagePage({
        mdTitle,
        mdMessage,
        mdName,
        connectTitle,
        connectSubtitle,
        mdPhoto: mdPhotoPath
      });
      await pageData.save();
    }

    res.status(200).json({ success: true, message: "Message section saved", data: pageData });

  } catch (error) {
    console.error("Save Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};