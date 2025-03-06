const ApiError = require("../exeptions/api-errors");
const categoryService = require("../services/category-service");

exports.getCategories = async (req, res, next) => {
  try {
    const {} = req.body;
    const user = req.user;

    const categories = await categoryService.getCategories({ user });
    return res.json(categories);
  } catch (e) {
    next(e);
  }
};

exports.addCategory = async (req, res, next) => {
  try {
    const { title } = req.body;
    if (!title) throw ApiError.BadRequest("Title is required!");
    const user = req.user;

    const category = await categoryService.createCategory({ title, user });
    return res.json(category);
  } catch (e) {
    next(e);
  }
};

exports.removeCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) throw ApiError.BadRequest("Category id is required!");
    const user = req.user;

    const category = await categoryService.removeCategory({ id, user });
    return res.json(category);
  } catch (e) {
    next(e);
  }
};
