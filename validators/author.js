const Author = require("../models/Author");

const AuthorValidator = {
  checkPayload: async (body, isNew) => {
    const errors = [];
    if (!body.name) {
      errors.push({
        message: "هیچ نامی برای نویسنده ثبت نشده است.",
        error: "name is null.",
        key: "name",
      });
    }
    if (isNew) {
      if (!body.authorId) {
        errors.push({
          message: "شناسه نویسنده را وارد کنید",
          error: "authorId is null.",
          key: "authorId",
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
    }
    return errors;
  },

  checkId: async (id) => {
    const author = await Author.findOne({ authorId: id });
    if (!author) {
      return {
        message: "شناسه نویسنده پیدا نشد.",
        error: "author is not in the list.",
        key: "authorId",
      };
    }
    return false;
  },

  checkToggleValue: (payload) => {
    if (!("isActive" in payload)) {
      return [
        {
          message: "درخواست نا معتبر است.",
          error: "isActive is not declared.",
          key: "isActive",
        },
      ];
    }
    return false;
  },
};

module.exports = AuthorValidator;
