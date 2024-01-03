const Author = require("../models/Author");
const AuthorValidator = require("../validators/author");

const router = require("express").Router();

router.post("/add", async (req, res) => {
  try {
    const payload = req.body;
    const messages = await AuthorValidator.checkPayload(payload);

    if (messages.length > 0) {
      res.status(400).json({ errors: messages });
      return;
    }

    await new Author(payload).save();
    const list = await Author.find();
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
