import mongoose from "mongoose";

const navLinkSchema = new mongoose.Schema({
  label: { type: String, required: true },
  path: { type: String, required: true },
  isExternal: { type: Boolean, default: false }
});

const headerSchema = new mongoose.Schema(
  {
    logo: { type: String, default: null }, // URL or path to logo
    contactWhatsApp: { type: String, default: "" },
    contactPhone: { type: String, default: "" },
    navLinks: [navLinkSchema],
    servicesDropdown: [navLinkSchema], // Sub-links for the services menu
  },
  { timestamps: true }
);

const HeaderSettings = mongoose.model("HeaderSettings", headerSchema);
export default HeaderSettings;