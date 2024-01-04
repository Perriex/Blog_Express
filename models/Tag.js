const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({
  slug: { type: String, index: true, unique: true, required: true },
  name: { type: String, required: true },
  parent: { type: String, required: false, default: "" },
  count: { type: Number, required: false, default: 0 },
});

module.exports = mongoose.model("Tag", tagSchema);
