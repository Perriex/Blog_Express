const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({
  slug: { type: String, index: true, unique: true, required: true },
  name: { type: String, required: true },
  parent: { type: String, required: false, default: "" },
});

module.exports = mongoose.model("Tag", tagSchema);
