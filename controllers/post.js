const Post = require("../models/Post");
const PostValidator = require("../validators/post");

const router = require("express").Router();

router.post("/create", async (req, res) => {
  try {
    const payload = req.body;
    const messages = await PostValidator.checkPayload(payload);

    if (messages.length > 0) {
      res.status(400).json({ errors: messages });
      return;
    }

    const savePost = new Post(payload);
    const savedPost = await savePost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
