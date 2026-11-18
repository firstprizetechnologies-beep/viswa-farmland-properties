require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");

(async () => {
  try {
    if (!process.env.MONGO_URI || !process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD || !process.env.JWT_SECRET) {
      throw new Error("Set MONGO_URI, ADMIN_EMAIL, ADMIN_PASSWORD and JWT_SECRET in .env");
    }
    if (process.env.ADMIN_PASSWORD.length < 12) throw new Error("ADMIN_PASSWORD must be at least 12 characters");
    await mongoose.connect(process.env.MONGO_URI);
    const email = process.env.ADMIN_EMAIL.trim().toLowerCase();
    const existing = await Admin.findOne({ email });
    if (existing) {
      console.log(`Admin ${email} already exists. No changes made.`);
    } else {
      const password = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12);
      await Admin.create({ email, password });
      console.log(`Admin created: ${email}`);
    }
    await mongoose.disconnect();
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
})();
