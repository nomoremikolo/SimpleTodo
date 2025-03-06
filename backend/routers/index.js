const Router = require("express").Router;
const router = new Router();
const authRouter = require("./auth-router");
const categoryRouter = require("./category-router");

router.use(authRouter);
router.use(categoryRouter);

module.exports = router;
