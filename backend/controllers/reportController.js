const Report = require("../models/Report");

exports.createReport = async (req, res) => {
  try {
    const { description, lat, lng } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const report = await Report.create({
      description,
      imageUrl,
      location: { lat, lng },
    });

    res.status(201).json(report);
  } catch (err) {
    res.status(500).json({ error: "Failed to create report" });
  }
};

exports.getReports = async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch reports" });
  }
};
