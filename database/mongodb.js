const mongoose = require("mongoose");
const config = require("./config.json");

async function connectToDatabase() {
  try {
    await mongoose.connect(config.url + config.collection, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
}

module.exports = connectToDatabase;
