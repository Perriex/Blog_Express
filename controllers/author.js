const Author = require("../models/Author");
const Post = require("../models/Post");
const AuthorValidator = require("../validators/author");

const router = require("express").Router();

router.post("/create", async (req, res) => {
  try {
    const payload = req.body;
    const messages = await AuthorValidator.checkPayload(payload, true);

    if (messages.length > 0) {
      res.status(400).json({ errors: messages });
      return;
    }

    const saveAuthor = new Author(payload);
    const savedAuthor = await saveAuthor.save();

    res.status(200).json({ code: 200, data: savedAuthor });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/update/:authorId", async (req, res) => {
  try {
    const payload = req.body;
    const authorId = req.params.authorId;

    const messages = await AuthorValidator.checkPayload(payload);
    const existness = await AuthorValidator.checkId(authorId);

    if (messages.length > 0 || existness) {
      res
        .status(400)
        .json({ errors: existness ? [...messages, existness] : messages });
      return;
    }

    if (payload.authorId && Number(payload.authorId) !== Number(authorId)) {
      res.status(400).json({
        errors: [
          {
            message: "شناسه نویسنده قابل ویرایش نمی باشد.",
            error: "author cannot be changed.",
            key: "authorId",
          },
        ],
      });
      return;
    }
    await Author.updateOne({ authorId }, payload);

    res.status(200).json({ code: 200, data: payload });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/all", async (req, res) => {
  try {
    const isActive = req.query.isActive;
    const name = req.query.name;

    const filter = {};

    if (isActive) filter.isActive = isActive;
    if (name) filter.name = { $regex: name };

    const data = await Author.find(filter);

    res.status(200).json({ code: 200, data });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/delete/:authorId", async (req, res) => {
  try {
    const authorId = req.params.authorId;
    const posts = await Post.find({});

    const existness = await AuthorValidator.checkId(authorId);

    if (existness) {
      res.status(400).json({ errors: [existness] });
      return;
    }

    const relatedPosts = posts.filter(async (post) => {
      if (post.author.id === item.authorId) {
        return post;
      }
      return false;
    });

    await Author.deleteMany({ authorId });

    res.status(200).json({
      code: 200,
      message:
        "نویسنده با موفقیت حذف شد، پست های مربوط به این نویسنده حذف نشدند.",
      posts: relatedPosts,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/toggle/:authorId", async (req, res) => {
  try {
    const authorId = req.params.authorId;
    const payload = req.body;

    const checkValue = AuthorValidator.checkToggleValue(payload);

    if (checkValue.length > 0) {
      res.status(400).json({
        errors: checkValue,
      });
      return;
    }

    const existness = await AuthorValidator.checkId(authorId);

    if (existness) {
      res.status(400).json({ errors: [existness] });
      return;
    }

    await Author.updateOne({ authorId }, [
      { $set: { isActive: payload.isActive } },
    ]);

    res.status(200).json({
      code: 200,
      message:
        "نویسنده با موفقیت " +
        (payload.isActive ? "فعال" : "غیر فعال") +
        " شد. ",
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:authorId", async (req, res) => {
  try {
    const authorId = req.params.authorId;
    const existness = await AuthorValidator.checkId(authorId);

    if (existness) {
      res.status(400).json({ errors: [existness] });
      return;
    }

    const author = await Author.findOne({ authorId });

    res.status(200).json({ code: 200, data: author });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
