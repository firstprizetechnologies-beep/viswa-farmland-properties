const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const Property = require("../models/Property");
const requireAdmin = require("../middleware/auth");
const upload = require("../middleware/upload");
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
    data.images = (req.files || []).map(file => imageUrl(file.filename));
    const property = await Property.create(data);
    res.status(201).json(property);
  } catch (error) { next(error); }
});

router.put("/properties/:id", upload.array("images", 10), async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: "Property not found" });

    const data = parsePropertyInput(req.body);
    let images = property.images || [];
    let removeImages = req.body.removeImages || [];
    if (typeof removeImages === "string") {
      try { removeImages = JSON.parse(removeImages); } catch { removeImages = []; }
    }
    if (Array.isArray(removeImages) && removeImages.length) {
      images = images.filter(url => !removeImages.includes(url));
      for (const url of removeImages) {
        const filename = path.basename(new URL(url).pathname);
        const filePath = path.join(__dirname, "..", "uploads", filename);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      }
    }

    const newImages = (req.files || []).map(file => imageUrl(file.filename));
    property.set({ ...data, images: [...images, ...newImages].slice(0, 10) });
    await property.save();
    res.json(property);
  } catch (error) { next(error); }
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
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property) return res.status(404).json({ message: "Property not found" });
    for (const url of property.images || []) {
      try {
        const filename = path.basename(new URL(url).pathname);
        const filePath = path.join(__dirname, "..", "uploads", filename);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      } catch (_) {}
    }
    res.json({ message: "Property deleted" });
  } catch (error) { next(error); }
});

module.exports = router;
