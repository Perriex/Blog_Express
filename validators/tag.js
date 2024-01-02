const Tag = require("../models/Tag");

const TagValidator = {
  checkTag: async (body) => {
    const errors = [];
    if (!body.slug) {
      errors.push({
        message: "شناسه دسته بندی را وارد کنید",
        error: "slug is null.",
        key: "slug",
      });
    }
    if (!body.name) {
      errors.push({
        message: "هیچ نامی برای دسته بندی مشخص نشده است",
        error: "name is null.",
        key: "name",
      });
    }
    if (body.parent) {
      const tagP = await Tag.find({ slug: body.parent });
      if (tagP.length === 0) {
        errors.push({
          message: "شناسه دسته بندی والد وجود ندارد",
          error: "parent is not in the list.",
          key: "parent",
        });
      }
    }
    const tag = await Tag.find({ slug: body.slug });
    if (tag.length > 0) {
      errors.push({
        message: "  این شناسه قبلا ثبت شده است.",
        error: "slug is already in the list.",
        key: "slug",
      });
    }

    return errors;
  },
};

module.exports = TagValidator;
