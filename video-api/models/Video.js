const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  title: String,
  description: String,
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Video", videoSchema);
