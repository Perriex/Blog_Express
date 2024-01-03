const Author = require("../models/Author");

const AuthorValidator = {
  checkPayload: async (body) => {
    const errors = [];
    if (!body.authorId) {
      errors.push({
        message: "شناسه نویسنده را وارد کنید",
        error: "authorId is null.",
        key: "authorId",
      });
    }
    if (!body.name) {
      errors.push({
        message: "هیچ نامی برای نویسنده ثبت نشده است.",
        error: "name is null.",
        key: "name",
      });
    }
    const author = await Author.find({ authorId: body.authorId });
    if (author.length > 0) {
      errors.push({
        message: "  این شناسه قبلا ثبت شده است.",
        error: "authorId is already in the list.",
        key: "authorId",
      });
    }
    return errors;
  },
};

module.exports = AuthorValidator;
