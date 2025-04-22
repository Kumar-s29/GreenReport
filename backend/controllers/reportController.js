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

exports.deleteReport = async (req, res) => {
  const { id } = req.params; // Get report id from params

  try {
    // Attempt to delete the report by id
    const deletedReport = await Report.findByIdAndDelete(id);

    if (!deletedReport) {
      return res.status(404).json({ error: "Report not found" });
    }

    // If successful, return a success message
    return res.status(200).json({ message: "Report deleted successfully" });
  } catch (error) {
    // In case of errors, log them and send a failure response
    console.error("Error deleting report:", error);
    return res.status(500).json({ error: "Server error during deletion" });
  }
};
