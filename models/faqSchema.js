import mongoose from 'mongoose';

// --- Sub-Schema: Individual Question & Answer ---
const FaqItemSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true }
});

// --- Main Schema ---
const FaqPageSchema = new mongoose.Schema({
  // 1. Hero Section
  heroSmall: { type: String, default: "EcoGlow" },  // e.g. "EcoGlow"
  heroLarge: { type: String, default: "FAQs" },     // e.g. "FAQs"
  heroBannerImg: { type: String, default: null },   // Optional banner image

  // 2. Intro / Section Header
  sectionLabel: { type: String, default: "FAQs" },
  sectionTitle: { type: String, default: "Before you choose a Cleaning Service" },

  // 3. The List of FAQs
  faqs: [FaqItemSchema]

}, { timestamps: true });

const FaqPage = mongoose.model("FaqPage", FaqPageSchema);

export default FaqPage;