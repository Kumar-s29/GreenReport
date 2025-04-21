const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  imageUrl: String,
  location: {
    lat: Number,
    lng: Number,
  },
  description: String,
  status: {
    type: String,
    enum: ["pending", "in_progress", "completed"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Report", reportSchema);
