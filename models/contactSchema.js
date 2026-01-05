import mongoose from "mongoose";

const contactPageSchema = new mongoose.Schema({
  // Hero Banner Section
  heroTitle: { type: String, default: "EcoGlow" },
  heroSubtitle: { type: String, default: "Contact" },
  bannerImage: { type: String }, // Stores the path to the background image

  // Form & Text Section
  formLabel: { type: String, default: "CONTACT US" },
  formMainTitle: { type: String, default: "Write to us" },
  
  // Information Details
  contactInfo: {
    address: { type: String, default: "Baghdad Street, Al Nahda 1, Dubai" },
    phone: { type: String, default: "+971 4 123 4567" },
    email: { type: String, default: "info@ecoglow.ae" }
  },

  // Map
  mapEmbedUrl: { type: String },
}, { timestamps: true });

const ContactPage = mongoose.model("ContactPage", contactPageSchema);
export default ContactPage;