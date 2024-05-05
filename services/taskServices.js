const TaskModel = require('../models/tasks');

const createTask = async (taskData) => {
  return TaskModel.create(taskData);
};

const getTasksByUserId = async (userId) => {
  return TaskModel.find({ userid: userId });
};

const updateTaskById = async (taskId, updateData) => {
  return TaskModel.findByIdAndUpdate(taskId, updateData, { new: true });
};

const deleteTaskById = async (taskId) => {
  return TaskModel.findByIdAndDelete(taskId);
};

module.exports = {
  createTask,
  getTasksByUserId,
  updateTaskById,
  deleteTaskById,
};
