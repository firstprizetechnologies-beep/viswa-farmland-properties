
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const allowed = new Set([
  "image/jpeg",
  "image/png",
  "image/webp"
]);

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "viswa-farmland-properties",
    allowed_formats: ["jpg", "jpeg", "png", "webp"]
  }
});

function fileFilter(_req, file, cb) {
  if (!allowed.has(file.mimetype)) {
    return cb(
      new Error("Only JPG, PNG and WebP images are allowed")
    );
  }

  cb(null, true);
}

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 10
  }
});

module.exports = upload;
