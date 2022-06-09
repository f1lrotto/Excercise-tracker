const mongoose = require('mongoose')

require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI;

async function connectMongo() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Database connected."); // je dobry habit vypisat aj url kam sa to connectuje 
  } catch (err) {
    console.error(err);
    process.exit(1); // lepsi napad je hodit ten err, alebo tebou vytvoreny ( pekne citatelny ) vyssie, a mat v main func jeden hlavny try catch
  }
}

module.exports = {
  connectMongo,
};
