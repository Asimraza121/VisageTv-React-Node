const mongoose = require("mongoose");

const liveStream = new mongoose.Schema(
  {
    name: { type: String },
    description: { type: String },
    stream_url: { type: String },
    thumbnail: { type: String },
    categories: { type: String },
    default: { type: Boolean, default: false },
    featured: { type: Boolean, default: false },
    stream_location: { type: String },
    stream_count: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("LiveStream", liveStream);
