const mongoose = require("mongoose");
const nanoid = require('nanoid')

const exerciseSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
    min: [1, "Duration too short, at least 1 minute"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: String,
    required: true,
  },
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  logs: [exerciseSchema],
});

module.exports = mongoose.model("user", userSchema);
