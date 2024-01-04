const Author = require("../models/Author");
const Tag = require("../models/Tag");
const Post = require("../models/Post");

const PostValidator = {
  checkPayload: async (body) => {
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
      for (let i = 0; i < body.tags.length; i++) {
        const tag = await Tag.find({ slug: body.tags[i] });
        if (tag.length === 0)
          errors.push({
            message: "دسته بندی " + body.tags[i] + " وجود ندارد.",
            error: body.tags[i] + " is not found.",
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
  checkId: async (id) => {
    const post = await Post.findOne({ _id: id });
    if (!post) {
      return {
        message: "کلید پست پیدا نشد.",
        error: "id is not in the list.",
        key: "id",
      };
    }
    return false;
  },
};

module.exports = PostValidator;
