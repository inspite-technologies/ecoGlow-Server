import mongoose from "mongoose";

const FooterSchema = new mongoose.Schema(
  {
    // Office Contact Info
    officeAddress: {
      type: String,
      default:
        "Office Number M-090A, Fashion Parking, Dubai Mall, United Arab Emirates.",
    },
    phone: { type: String, default: "+971 4 123 4567" },
    whatsapp: { type: String, default: "+971 50 123 4567" },
    email: { type: String, default: "info@ecoglow.ae" },
    usefulLinks: [
      {
        label: { type: String },
        url: { type: String },
      },
    ],

    // Social Media
    socialLinks: {
      facebook: { type: String, default: "https://facebook.com/ecoglow" },
      instagram: { type: String, default: "https://instagram.com/ecoglow" },
      youtube: { type: String, default: "https://youtube.com/@ecoglow" },
    },

    // Legal
    copyrightText: {
      type: String,
      default: "Copyright © 2025 EcoGlow. All rights reserved",
    },
  },
  { timestamps: true }
);

const Footer = mongoose.model("Footer", FooterSchema);

export default Footer;
