import mongoose from "mongoose";

const Schema = mongoose.Schema;

/* Sub-schema for Vision / Mission / Values */
const AboutItemSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true }
});

/* Main About Schema */
const HomeAboutSchema = new Schema(
  {
    // 🔥 Luxury heading split
    heroHighlightText: { type: String, default: "" }, // "Luxury standard"
    heroTitle: { type: String, default: "" },         // rest of heading text

    // Right-side paragraphs
    heroParagraphs: {
      type: [String],
      default: []
    },

    // Image for values section
    valuesCommonImage: { type: String, default: null },

    // Accordion items
    items: [AboutItemSchema]
  },
  { timestamps: true }
);

const HomeAbout = mongoose.model("HomeAbout", HomeAboutSchema);
export default HomeAbout;
