const TaskModel = require("../models/taskModel");
const Status = require("../models/statusModel");
const User = require("../models/userModel");

const createTask = async (taskData) => {
  return TaskModel.create(taskData);
};

const getTasksByUserId = async (userId) => {
  return TaskModel.find({ userId: userId })
    .populate("status", "status")
    .populate("userId", "name email")
    .populate("refUserId", "name email")
    .exec();
};

const updateTaskById = async (taskId, updateData) => {
  return TaskModel.findByIdAndUpdate(taskId, updateData, { new: true });
};

const deleteTaskById = async (taskId) => {
  return TaskModel.findByIdAndDelete(taskId);
};

const getAllTasks = async () => {
  return TaskModel.find()
    .populate("status", "status")
    .populate("userId", "name email")
    .populate("refUserId", "name email")
    .exec();
};

module.exports = {
  createTask,
  getTasksByUserId,
  updateTaskById,
  deleteTaskById,
  getAllTasks,
};
