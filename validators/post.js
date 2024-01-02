const Author = require("../models/Author");
const Tag = require("../models/Tag");

const PostValidator = {
  checkPost: async (body) => {
    const errors = [];
    if (body.title?.length > 100) {
      errors.push({
        message: "عنوان باید کمتر از 100 کارکتر باشد.",
        error: body.title?.length + " is the title length.",
        key: "title",
      });
    }
    if (body.content?.length === 0) {
      errors.push({
        message: "هیچ محتوایی ثبت نشده است.",
        error: "content is null.",
        key: "content",
      });
    }
    if (body.brief?.length > 250) {
      errors.push({
        message: "خلاصه باید کمتر از 250 کارکتر باشد.",
        error: body.brief?.length + " is the title length.",
        key: "brief",
      });
    }
    if (body.author) {
      const author = await Author.find({ authorId: body.author.id });
      if (author.length === 0)
        errors.push({
          message: "نویسنده وارد شده در لیست نویسندگان وجود ندارد.",
          error: body.author.id + " is not found.",
          key: "author",
        });
    } else {
      errors.push({
        message: "نویسنده محتوا را انتخاب کنید.",
        error: "author is null.",
        key: "author",
      });
    }
    if (body.tags?.length > 0) {
      for (let t in body.tags) {
        const tag = await Tag.find({ slug: t });
        if (tag.length === 0)
          errors.push({
            message: "دسته بندی " + t + " وجود ندارد.",
            error: t + " is not found.",
            key: "tag[]",
          });
      }
    } else {
      errors.push({
        message: "محتوا باید حداقل یک دسته بندی داشته باشد.",
        error: "tag[] is null.",
        key: "tag[]",
      });
    }
    if (!body.creatorId) {
      errors.push({
        message: "شناسه کاربر ایجادکننده را وارد کنید.",
        error: "creatorId is null",
        key: "creatorId",
      });
    }
    return errors;
  },
};

module.exports = PostValidator;
