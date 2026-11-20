
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "viswa-farmland-properties",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const allowed = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);

function fileFilter(req, file, cb) {
  if (!allowed.has(file.mimetype)) {
    return cb(new Error("Only JPG, PNG and WebP images are allowed"));
  }

  cb(null, true);
}

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 10,
  },
});

module.exports = { cloudinary, upload };
