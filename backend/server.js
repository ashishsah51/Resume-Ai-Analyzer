// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const analyzeRoute = require("./routes/analyze");
const enhanceRoute = require("./routes/enhanceResume");
const statsRoutes = require("./routes/stats");

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Allow your frontend domains
app.use(
  cors({
    origin: [
      "https://resume-ai-analyzer-alpha.vercel.app",
      "https://resume-ai-analyzer-seven.vercel.app",
    ],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

// Routes
app.use("/api/analyze", analyzeRoute);
app.use("/api/enhance", enhanceRoute);
app.use("/api/stats", statsRoutes);

// Health check route
app.get("/", (req, res) => {
  res.send("✅ Server is running!");
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
