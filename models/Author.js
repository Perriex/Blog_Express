const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  authorId: { type: Number, required: true, index: true, unique: true },
  name: { type: String, required: true },
  picture: { type: String, required: false },
  info: { type: String, required: false }
});

module.exports = mongoose.model("Author", authorSchema);
