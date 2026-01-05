import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    mdTitle: {
      type: String,
      default: "MD's Message",
    },
    mdMessage: {
      type: String,
      required: true,
      default: "Lorem ipsum dolor sit amet...",
    },
    mdName: {
      type: String,
      default: "Kami Tarazi",
    },
    mdPhoto: {
      type: String, 
      default: null,
    },

    connectTitle: {
      type: String,
      default: "LET'S CONNECT",
    },
    connectSubtitle: {
      type: String,
      default: "Stay updated with upcoming EcoGlow events.",
    },
  },
  { timestamps: true }
);

const MessagePage = mongoose.model("MessagePage", messageSchema);

export default MessagePage;