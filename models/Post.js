const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, maxLegth: 100 },
    content: { type: String, required: true },
    brief: { type: String, required: true, maxLegth: 250 },
    active: { type: Boolean, default: false },
    author: {
      type: {
        id: { type: Number, required: true },
        name: { type: String, required: true },
      },
      required: true,
    },
    likeCount: { type: Number, default: 0 },
    attachments: [
      {
        title: { type: String, required: true },
        link: { type: String, required: true },
      },
    ],
    tags: {
      type: [String],
      required: true,
    },
    creatorId: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
