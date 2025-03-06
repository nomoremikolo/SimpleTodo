const ApiError = require("../exeptions/api-errors");
const User = require("../models/user-model");

exports.createUser = async ({ email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw ApiError.BadRequest("Email already in use");

  const user = new User({ email, password });
  await user.save();

  return user;
};
