const Router = require("express").Router;
const authController = require("../controllers/auth-controller");
const authMiddleware = require("../middlewares/auth-middleware");
const router = new Router();

router.post("/login", authController.login);
router.post("/register", authController.register);

module.exports = router;
