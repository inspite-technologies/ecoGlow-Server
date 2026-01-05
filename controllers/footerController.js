import Footer from "../models/footerSchema.js";

const getFooter = async (req, res) => {
  try {
    const footer = await Footer.findOne();
    if (!footer) {
      return res.status(200).json({ message: "No footer found", data: {} });
    }
    res.status(200).json(footer);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching footer", error: error.message });
  }
};

// UPSERT FOOTER DATA (Create or Update)
const upsertFooter = async (req, res) => {
  try {
    const updateData = {
      officeAddress: req.body.officeAddress,
      phone: req.body.phone,
      whatsapp: req.body.whatsapp,
      email: req.body.email,
      usefulLinks: req.body.usefulLinks, // Expected as an array of {label, url}
      socialLinks: {
        facebook: req.body.facebook,
        instagram: req.body.instagram,
        youtube: req.body.youtube,
      },
      copyrightText: req.body.copyrightText,
    };

    // {} as first param finds the first doc, upsert: true creates it if missing
    const footer = await Footer.findOneAndUpdate({}, updateData, {
      upsert: true,
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      message: "Footer updated successfully",
      data: footer,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error saving footer", error: error.message });
  }
};

export { getFooter, upsertFooter };
