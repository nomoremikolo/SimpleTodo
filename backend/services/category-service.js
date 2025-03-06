const ApiError = require("../exeptions/api-errors");
const Category = require("../models/category-model");

exports.createCategory = async ({ title, user }) => {
  const existingCategory = await Category.findOne({ user: user.id, title });
  if (existingCategory)
    throw ApiError.BadRequest("Category with this name already exist");

  const newCategory = new Category({ title, user: user.id });
  await newCategory.save();

  return newCategory;
};
exports.removeCategory = async ({ id, user }) => {
  const existingCategory = await Category.findOne({ user: user.id, _id: id });
  if (!existingCategory) throw ApiError.BadRequest("Category not exist");

  await existingCategory.deleteOne();

  return null;
};

exports.getCategories = async ({ user }) => {
  const categories = await Category.find({ id: user.id });
  return categories;
};
