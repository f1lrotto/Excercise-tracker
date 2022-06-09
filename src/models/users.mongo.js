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
    // je dobra prax pouzivat "created_at" property na toto
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema({
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

  // tiez nie je na skodu vsade dat "created_at" property, zaroven je tiez dost popularna aj "updated_at" property
});

module.exports = mongoose.model("user", userSchema);
