import express from "express";
import cors from "cors";
import "dotenv/config";
import path from "path";

import connectDB from "./config/connection.js";

// routes
import adminRoutes from "./routes/adminRoutes.js";
import aboutUsRoutes from "./routes/aboutUsRoutes.js";
import servicesRoutes from "./routes/servicesRoutes.js";
import packagesRoutes from "./routes/packagesRoutes.js";
import faqRoutes from "./routes/faqRoutes.js";
import heroRoutes from "./routes/heroRoutes.js";
import homeAboutRoutes from "./routes/HomeAboutRoutes.js";
import homeServicesRoutes from "./routes/servicesHomeRoutes.js";
import bannerRoutes from "./routes/homeBannerRoutes.js";
import advantagesRoutes from "./routes/advantagesRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import footerRoutes from "./routes/footerRouter.js";

const app = express();

/* ================================
   🔍 REQUEST LOGGER (DEBUG)
================================ */
app.use((req, res, next) => {
  console.log(
    "REQ:",
    req.method,
    req.originalUrl,
    "ORIGIN:",
    req.headers.origin
  );
  next();
});

/* ================================
   ✅ CORS (TEMP OPEN – GUARANTEED)
================================ */
app.use(
  cors({
    origin: true,        // reflect request origin
    credentials: true,   // allow cookies
  })
);

// 🔥 Handle preflight
app.options("*", cors());

/* ================================
   ✅ BODY PARSERS
================================ */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ================================
   ✅ STATIC FILES
================================ */
app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "uploads"))
);

/* ================================
   ✅ ROUTES
================================ */
app.get("/", (req, res) => {
  res.json({ status: "EcoGlow backend running ✅" });
});

app.use("/admin", adminRoutes);
app.use("/about-us", aboutUsRoutes);
app.use("/services", servicesRoutes);
app.use("/packages", packagesRoutes);
app.use("/faq", faqRoutes);
app.use("/hero", heroRoutes);
app.use("/home-about", homeAboutRoutes);
app.use("/home-services", homeServicesRoutes);
app.use("/banner", bannerRoutes);
app.use("/advantages", advantagesRoutes);
app.use("/message", messageRoutes);
app.use("/contact", contactRoutes);
app.use("/bookings", bookingRoutes);
app.use("/footer", footerRoutes);

/* ================================
   🚀 START SERVER
================================ */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

connectDB();
