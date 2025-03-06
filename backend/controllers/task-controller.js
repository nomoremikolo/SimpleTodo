const ApiError = require("../exeptions/api-errors");
const taskService = require("../services/task-service");

exports.addTask = async (req, res, next) => {
  try {
    const user = req.user;
    const { title, completed, dueDate, category } = req.body;
    if (!title) throw ApiError.BadRequest("Title is required!");

    const task = await taskService.createTask({
      user,
      task: {
        title,
        completed,
        dueDate,
        category: category ? category.id : null,
      },
    });

    return res.json(task);
  } catch (e) {
    next(e);
  }
};
exports.removeTask = async (req, res, next) => {
  try {
    const user = req.user;
    const { id } = req.params;
    const task = await taskService.deleteTask({ user, id });
    return res.json(task);
  } catch (e) {
    next(e);
  }
};
exports.getTasks = async (req, res, next) => {
  try {
    const user = req.user;
    const { category } = req.body;
    const tasks = await taskService.getTasks({ user, category });

    return res.json(tasks);
  } catch (e) {
    next(e);
  }
};
