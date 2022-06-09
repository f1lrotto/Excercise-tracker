const mongoose = require('mongoose')

require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI;

async function connectMongo() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Database connected to:");
    console.log(MONGO_URI)
  } catch (err) {
    throw err
  }
}

module.exports = {
  connectMongo,
};
