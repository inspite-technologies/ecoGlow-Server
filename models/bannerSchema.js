import mongoose from "mongoose";

const Schema = mongoose.Schema;

const BannerSchema = new Schema(
  {
    text: { type: String, default: "" },
    image: { type: String, default: null },
  },
  { timestamps: true }
);

const Banner = mongoose.model("Banner", BannerSchema);

export default Banner;