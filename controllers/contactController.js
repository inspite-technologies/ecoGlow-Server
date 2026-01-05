import ContactPage from "../models/contactSchema.js";

// GET: Fetch the single contact document
export const getContactPage = async (req, res) => {
  try {
    const data = await ContactPage.findOne();
    res.status(200).json({ success: true, data: data || {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// UPSERT: Create or Update without needing an ID
export const updateContactPage = async (req, res) => {
  const { heroTitle, heroSubtitle, formLabel, formMainTitle, mapEmbedUrl, address, phone, email } = req.body;

  const updateData = {
    heroTitle,
    heroSubtitle,
    formLabel,
    formMainTitle,
    mapEmbedUrl,
    // THIS IS THE CRITICAL PART:
    contactInfo: {
      address, // This will now save the multi-line string correctly
      phone,
      email
    }
  };

  if (req.file) {
    updateData.bannerImage = req.file.path;
  }

  const updated = await ContactPage.findOneAndUpdate({}, updateData, { upsert: true, new: true });
  res.json({ success: true, data: updated });
};