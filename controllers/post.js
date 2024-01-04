const Author = require("../models/Author");
const Post = require("../models/Post");
const Tag = require("../models/Tag");

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

router.post("/update/:id", async (req, res) => {
  try {
    const payload = req.body;
    const id = req.params.id;

    const messages = await PostValidator.checkPayload(payload);
    const existness = await PostValidator.checkId(id);

    if (messages.length > 0 || existness) {
      res
        .status(400)
        .json({ errors: existness ? [...messages, existness] : messages });
      return;
    }

    await Post.updateOne({ _id: id }, payload);

    res.status(200).json({ code: 200, data: payload });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/all", async (req, res) => {
  try {
    const data = await Post.find({});

    res.status(200).json({ code: 200, data });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const existness = await PostValidator.checkId(id);

    if (existness) {
      res.status(400).json({ errors: [existness] });
      return;
    }
    await Post.deleteMany({ _id: id });

    res.status(200).json({
      code: 200,
      message: "دسته بندی با موفقیت حذف شد.",
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const existness = await PostValidator.checkId(id);

    if (existness) {
      res.status(400).json({ errors: [existness] });
      return;
    }

    const post = await Post.findOne({ _id: id });
    const tags = await Tag.find({
      slug: post.tags,
    });
    const author = await Author.find({
      authorId: post.author.id,
    });

    res
      .status(200)
      .json({
        code: 200,
        data: { ...post._doc, detailedTags: tags, detailedAuthor: author },
      });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
