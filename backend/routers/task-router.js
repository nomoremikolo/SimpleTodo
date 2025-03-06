const Router = require("express").Router;
const taskController = require("../controllers/task-controller");
const authMiddleware = require("../middlewares/auth-middleware");

const router = new Router();

router.get("/task", authMiddleware, taskController.getTasks);
router.post("/task", authMiddleware, taskController.addTask);
router.delete("/task/:id", authMiddleware, taskController.removeTask);

module.exports = router;
