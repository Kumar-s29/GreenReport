const express = require("express");
const multer = require("multer");
const { createReport, getReports } = require("../controllers/reportController");

const router = express.Router();

// File Upload Setup
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage });

router.post("/", upload.single("image"), createReport);
router.get("/", getReports);

module.exports = router;
