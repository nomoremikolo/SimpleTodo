const authService = require("../services/auth-service");

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userData = await authService.login({ email, password });
    res.cookie("refreshToken", userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.json(userData);
  } catch (e) {
    next(e);
  }
};

exports.register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userData = await authService.registerUser({ email, password });
    res.cookie("refreshToken", userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.json(userData);
  } catch (e) {
    next(e);
  }
};
