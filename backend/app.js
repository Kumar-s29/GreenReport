const express = require("express");
const cors = require("cors");
const reportRoutes = require("./routes/reportRoutes");
const path = require("path");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/reports", reportRoutes);

module.exports = app;
