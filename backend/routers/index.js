const Router = require("express").Router;
const router = new Router();
const authRouter = require("./auth-router");

router.use(authRouter);

module.exports = router;
