const UserModel = require("../models/user-model");
const ApiError = require("../exeptions/api-errors");
const bcrypt = require("bcrypt");
const UserDto = require("../dtos/user-dto");
const tokenService = require("./token-service");
const usersService = require("./user-service");

exports.login = async ({ email, password }) => {
  const user = await UserModel.findOne({ email });
  if (!user) throw ApiError.BadRequest("Incorrect login or password");

  const isPasswordEqual = await bcrypt.compare(password, user.password);
  if (!isPasswordEqual)
    throw ApiError.BadRequest("Incorrect login or password");

  const userDto = new UserDto(user);
  const tokens = tokenService.generateTokens({ ...userDto });
  await tokenService.saveToken(userDto.id, tokens.refreshToken);

  return {
    ...tokens,
    user: userDto,
  };
};

exports.registerUser = async ({ email, password }) => {
  const passwordHash = await bcrypt.hash(password, 3);
  const user = await usersService.createUser({ email, password: passwordHash });

  const userDto = new UserDto(user);
  const tokens = tokenService.generateTokens({ ...userDto });
  await tokenService.saveToken(userDto.id, tokens.refreshToken);

  return {
    ...tokens,
    user: userDto,
  };
};
