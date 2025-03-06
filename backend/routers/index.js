const Router = require("express").Router;
const router = new Router();
const authRouter = require("./auth-router");
const categoryRouter = require("./category-router");
const taskRouter = require("./task-router");

router.use(authRouter);
router.use(categoryRouter);
router.use(taskRouter);

module.exports = router;
