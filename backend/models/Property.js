const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 150 },
  location: { type: String, required: true, trim: true, maxlength: 200 },
  district: { type: String, trim: true, maxlength: 100, default: "" },
  price: { type: Number, min: 0, default: 0 },
  area: { type: String, trim: true, maxlength: 100, default: "" },
  description: { type: String, trim: true, maxlength: 5000, default: "" },
  amenities: [{ type: String, trim: true, maxlength: 5000 }],
  images: [{ type: String }],
  status: { type: Boolean, default: true, index: true }
}, { timestamps: true });

propertySchema.index({ createdAt: -1 });
module.exports = mongoose.model("Property", propertySchema);
