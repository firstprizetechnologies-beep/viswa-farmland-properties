require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const connectDB = require("./config/db");

const app = express();
const allowedOrigins = (process.env.CORS_ORIGINS || process.env.CLIENT_ORIGIN || "http://localhost:5173")
  .split(",").map(origin => origin.trim()).filter(Boolean);

app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("Origin not allowed by CORS"));
  }
}));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
if (process.env.NODE_ENV !== "production") app.use(morgan("dev"));

app.use("/uploads", express.static(path.join(__dirname, "uploads"), {
  fallthrough: false,
  setHeaders(res) { res.setHeader("Cache-Control", "public, max-age=86400"); }
}));

app.get("/api/health", (_req, res) => res.json({ status: "ok" }));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/public", require("./routes/publicRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

app.use((err, _req, res, _next) => {
  console.error(err);
  const status = err.status || (err.name === "MulterError" ? 400 : 500);
  res.status(status).json({
    message: status === 500 ? "Server error" : err.message || "Request failed"
  });
});

const port = process.env.PORT || 5000;
connectDB().then(() => app.listen(port, () => console.log(`API listening on ${port}`)))
  .catch(error => { console.error("Database connection failed:", error.message); process.exit(1); });
