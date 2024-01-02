const Tag = require("../models/Tag");
const TagValidator = require("../validators/tag");

const router = require("express").Router();

router.post("/create", async (req, res) => {
  try {
    const payload = req.body;
    const messages = await TagValidator.checkValid(payload, true);

    if (messages) {
      res.status(400).json({ errors: messages });
      return;
    }

    await new Tag(payload).save();
    const list = await Tag.find();
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
