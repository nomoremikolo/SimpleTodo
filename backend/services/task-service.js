const ApiError = require("../exeptions/api-errors");
const Task = require("../models/task-model");

exports.createTask = async ({ user, task }) => {
  const newTask = new Task({ ...task, user: user.id });
  await newTask.save();

  return newTask;
};
exports.deleteTask = async ({ user, id }) => {
  const existingTask = await Task.findOne({ user: user.id, _id: id });
  if (!existingTask) throw ApiError.BadRequest("Task not exist");

  await existingTask.deleteOne();

  return null;
};
exports.getTasks = async ({ user, category }) => {
  if (category) {
    const tasks = await Task.find({ user: user.id, category: category.id });

    return tasks;
  }

  const tasks = await Task.find({ user: user.id });

  return tasks;
};
