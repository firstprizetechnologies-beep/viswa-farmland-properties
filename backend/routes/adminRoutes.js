const router = require("express").Router();
const Property = require("../models/Property");
const requireAdmin = require("../middleware/auth");
const { upload, cloudinary } = require("../config/cloudinary");
const parsePropertyInput = require("../utils/propertyInput");

router.use(requireAdmin);

const imageUrl = filename => `${process.env.PUBLIC_BASE_URL || `http://localhost:${process.env.PORT || 5000}`}/uploads/${filename}`;

router.get("/dashboard", async (_req, res, next) => {
  try {
    const [total, active, disabled] = await Promise.all([
      Property.countDocuments(),
      Property.countDocuments({ status: true }),
      Property.countDocuments({ status: false })
    ]);
    res.json({ total, active, disabled });
  } catch (error) { next(error); }
});

router.get("/properties", async (_req, res, next) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });
    res.json(properties);
  } catch (error) { next(error); }
});

router.post("/properties", upload.array("images", 10), async (req, res, next) => {
  try {
    const data = parsePropertyInput(req.body);
    data.images = (req.files || []).map(file => file.path);
    const property = await Property.create(data);
    res.status(201).json(property);
  } catch (error) { next(error); }
});


router.put("/properties/:id", upload.array("images", 10), async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    const data = parsePropertyInput(req.body);

    let images = property.images || [];

    let removeImages = req.body.removeImages || [];

    if (typeof removeImages === "string") {
      try {
        removeImages = JSON.parse(removeImages);
      } catch {
        removeImages = [removeImages];
      }
    }

    if (!Array.isArray(removeImages)) {
      removeImages = [];
    }

    // Delete selected images from Cloudinary
    for (const url of removeImages) {
      if (!images.includes(url)) continue;

      try {
        const parsedUrl = new URL(url);
        const parts = parsedUrl.pathname.split("/");
        const uploadIndex = parts.indexOf("upload");

        if (uploadIndex === -1) continue;

        let imageParts = parts.slice(uploadIndex + 1);

        // Remove transformations and version information
        const versionIndex = imageParts.findIndex(
          part => /^v\d+$/.test(part)
        );

        if (versionIndex !== -1) {
          imageParts = imageParts.slice(versionIndex + 1);
        }

        const publicId = imageParts
          .join("/")
          .replace(/\.[^/.]+$/, "");

        const result = await cloudinary.uploader.destroy(publicId);

        if (result.result !== "ok" && result.result !== "not found") {
          throw new Error("Cloudinary image deletion failed");
        }

        images = images.filter(image => image !== url);

      } catch (error) {
        console.error("Cloudinary deletion error:", error);
        throw error;
      }
    }

    // New images are already uploaded to Cloudinary
    const newImages = (req.files || []).map(file => file.path);

    // Save updated property
    property.set({
      ...data,
      images: [...images, ...newImages].slice(0, 10)
    });

    await property.save();

    res.json(property);

  } catch (error) {
    next(error);
  }
});


router.patch("/properties/:id/status", async (req, res, next) => {
  try {
    if (typeof req.body.status !== "boolean") {
      return res.status(400).json({ message: "Status must be true or false" });
    }
    const property = await Property.findByIdAndUpdate(
      req.params.id, { status: req.body.status }, { new: true, runValidators: true }
    );
    if (!property) return res.status(404).json({ message: "Property not found" });
    res.json(property);
  } catch (error) { next(error); }
});

router.delete("/properties/:id", async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        message: "Property not found"
      });
    }

    // Delete images from Cloudinary
    for (const url of property.images || []) {
      try {
        const parsedUrl = new URL(url);
        const parts = parsedUrl.pathname.split("/");
        const uploadIndex = parts.indexOf("upload");

        if (uploadIndex === -1) continue;

        const publicId = parts
          .slice(uploadIndex + 2)
          .join("/")
          .replace(/\.[^/.]+$/, "");

        await cloudinary.uploader.destroy(publicId);

      } catch (error) {
        console.error("Cloudinary image deletion error:", error);
      }
    }

    // Delete property from MongoDB
    await Property.findByIdAndDelete(req.params.id);

    res.json({
      message: "Property and Cloudinary images deleted successfully"
    });

  } catch (error) {
    next(error);
  }
});

module.exports = router;
