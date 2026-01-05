import express from "express";
import "dotenv/config";
import cors from "cors";
import path from "path";

// DB
import connectDB from "./config/connection.js";

// Routes
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
import adminRoutes from "./routes/adminRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import footerRoutes from "./routes/footerRouter.js";

const app = express();

/* ============================
   ✅ CORS CONFIG (IMPORTANT)
============================ */
const allowedOrigins = [
  "http://localhost:5173",
  "https://ecoglow-r8v4.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow Postman / server-side requests
      if (!origin) return callback(null, true);

      // Allow Vercel + local
      if (
        allowedOrigins.includes(origin) ||
        origin.endsWith(".vercel.app")
      ) {
        return callback(null, true);
      }

      return callback(new Error("CORS not allowed"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "token"],
  })
);

// 🔥 Handle preflight requests
app.options("*", cors());

/* ============================
   ✅ BODY PARSERS
============================ */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ============================
   ✅ STATIC FILES
============================ */
app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "uploads"))
);

/* ============================
   ✅ ROUTES
============================ */
app.get("/", (req, res) => {
  res.send("EcoGlow Server Running ✅");
});

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
app.use("/admin", adminRoutes);
app.use("/bookings", bookingRoutes);
app.use("/footer", footerRoutes);

/* ============================
   ✅ START SERVER
============================ */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// Connect DB AFTER server starts
connectDB();
