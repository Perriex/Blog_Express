const Tag = require("../models/Tag");
const TagValidator = require("../validators/tag");

const router = require("express").Router();

router.post("/create", async (req, res) => {
  try {
    const payload = req.body;
    const messages = await TagValidator.checkPayload(payload, true);

    if (messages.length > 0) {
      res.status(400).json({ errors: messages });
      return;
    }

    const saveTag = new Tag(payload);
    const savedTag = await saveTag.save();

    res.status(200).json({ code: 200, data: savedTag });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/update/:slug", async (req, res) => {
  try {
    const payload = req.body;
    const slug = req.params.slug;

    const messages = await TagValidator.checkPayload(payload);
    const existness = await TagValidator.checkSlug(slug);

    if (messages.length > 0 || existness) {
      res
        .status(400)
        .json({ errors: existness ? [...messages, existness] : messages });
      return;
    }

    await Tag.updateOne({ slug }, payload);

    res.status(200).json({ code: 200, data: payload });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/all", async (req, res) => {
  try {
    const data = await Tag.find({});

    res.status(200).json({ code: 200, data });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/delete/:slug", async (req, res) => {
  try {
    const slug = req.params.slug;
    const existness = await TagValidator.checkSlug(slug);

    if (existness) {
      res.status(400).json({ errors: [existness] });
      return;
    }
    await Tag.deleteMany({ slug });

    res.status(200).json({
      code: 200,
      message:
        "دسته بندی با موفقیت حذف شد، اما در دسته بندی پست ها باقی مانده است.",
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:slug", async (req, res) => {
  try {
    const slug = req.params.slug;
    const existness = await TagValidator.checkSlug(slug);

    if (existness) {
      res.status(400).json({ errors: [existness] });
      return;
    }

    const tag = await Tag.findOne({ slug });
    res.status(200).json({ code: 200, data: tag });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
