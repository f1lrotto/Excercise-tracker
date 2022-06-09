const mongoose = require("mongoose");
const { nanoid } = require("nanoid");

const exerciseSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      default: () => nanoid(5),
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
      min: [1, "Duration too short, at least 1 minute"],
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema({
  created_at: {
    type: Date,
    default: Date.now,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  logs: [exerciseSchema],

});

module.exports = mongoose.model("user", userSchema);
