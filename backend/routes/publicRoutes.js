const router = require("express").Router();
const Property = require("../models/Property");

router.get("/properties", async (_req, res, next) => {
  try {
    const properties = await Property.find({  }).sort({ createdAt: -1 });
    res.json(properties);
  } catch (error) { next(error); }
});

router.get("/properties/:id", async (req, res, next) => {
  try {
    const property = await Property.findOne({ _id: req.params.id, status: true });
    if (!property) return res.status(404).json({ message: "Property not found" });
    res.json(property);
  } catch (error) { next(error); }
});

module.exports = router;
