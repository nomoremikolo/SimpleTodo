const jwt = require("jsonwebtoken");
const tokenModel = require("../models/token-model");

exports.generateTokens = (payload) => {
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "1d",
  });
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "30d",
  });
  return {
    accessToken,
    refreshToken,
  };
};

exports.validateAccessToken = (token) => {
  try {
    const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    return userData;
  } catch (e) {
    return null;
  }
};

exports.validateRefreshToken = (token) => {
  try {
    const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    return userData;
  } catch (e) {}
};

exports.saveToken = async (userId, refreshToken) => {
  const tokenData = await tokenModel.findOne({ user: userId });
  if (tokenData) {
    tokenData.refreshToken = refreshToken;
    return tokenData.save();
  }
  const token = await tokenModel.create({ user: userId, refreshToken });
  return token;
};

exports.removeToken = async (refreshToken) => {
  const tokenData = await tokenModel.deleteOne({ refreshToken });
  return tokenData;
};

exports.findToken = async (refreshToken) => {
  const tokenData = await tokenModel.findOne({ refreshToken });
  return tokenData;
};
