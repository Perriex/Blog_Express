const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  authorId: { type: Number, required: true, index: true, unique: true },
  name: { type: String, required: true },
  picture: { type: String, required: false },
  info: { type: String, required: false },
  isActive: { type: Boolean, required: false, default: true },
  count: { type: Number, required: false, default: 0 },
});

module.exports = mongoose.model("Author", authorSchema);
