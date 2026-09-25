require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middleware/authMiddleware");
const resumeRoutes = require("./routes/resumeRoutes");
const path = require("path");

const app = express();

/* ---------- CORS ---------- */
// Allowed origins list — local dev + deployed frontend
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  process.env.FRONTEND_URL,   // Vercel pe env var se aayega
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (Postman, mobile apps, curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
}));

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ---------- Routes ---------- */
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);

app.get("/", (req, res) => {
  res.send("AI Resume Analyzer API Running");
});

/* ---------- MongoDB Connection ---------- */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MONGODB CONNECTED"))
  .catch((err) => console.log("MongoDB connection error:", err));

/* ---------- Local dev server ---------- */
// Only start listening when NOT running on Vercel
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 6000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

/* ---------- Vercel serverless export ---------- */
module.exports = app;