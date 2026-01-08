import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config();

// Ensure these are set in your Render Environment Variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    // Optional: Organize files into folders on Cloudinary based on the route
    // You can customize this logic if you want specific folders for specific routes
    return {
      folder: 'eco-glow-uploads', // The folder name in your Cloudinary dashboard
      resource_type: 'auto',      // Auto-detect (image, video, etc.)
      public_id: `${Date.now()}-${file.originalname.split('.')[0]}`,
    };
  },
});

const upload = multer({ storage: storage });

export default upload;