import HeaderSettings from "../models/headerSchema.js";

export const getHeaderSettings = async (req, res) => {
  try {
    const settings = await HeaderSettings.findOne();
    res.status(200).json({ success: true, data: settings || {} });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateHeaderSettings = async (req, res) => {
  try {
    const { contactWhatsApp, contactPhone, navLinks, servicesDropdown } = req.body;
    
    let updateData = {
      contactWhatsApp,
      contactPhone,
      // Parse JSON strings if coming from FormData
      navLinks: typeof navLinks === 'string' ? JSON.parse(navLinks) : navLinks,
      servicesDropdown: typeof servicesDropdown === 'string' ? JSON.parse(servicesDropdown) : servicesDropdown,
    };

    // Handle logo upload if provided
    if (req.file) {
      updateData.logo = req.file.path;
    }

    const updated = await HeaderSettings.findOneAndUpdate(
      {}, 
      { $set: updateData },
      { new: true, upsert: true }
    );

    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};