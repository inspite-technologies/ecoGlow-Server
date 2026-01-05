import multer from 'multer';
import fs from 'fs';
import path from 'path';

// Ensure folder exists
const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'bannerImage') {
      ensureDir('uploads/banners');
      cb(null, 'uploads/banners');
    } else if (file.fieldname.startsWith('itemIcon_')) {
      ensureDir('uploads/icons');
      cb(null, 'uploads/icons');
    } else if (file.fieldname.startsWith('itemImage_')) {
      ensureDir('uploads/items');
      cb(null, 'uploads/items');
    } else {
      ensureDir('uploads/others');
      cb(null, 'uploads/others');
    }
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });
export default upload;
