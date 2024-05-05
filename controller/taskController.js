const taskService = require('../services/taskServices');

const handleError = (res, error) => {
  console.error(error);
  res.status(500).json({ status: 'error', message: 'Internal Server Error' });
};

const createTask = async (req, res, next) => {
  const { userId, task } = req.body;
  if (!userId) {
    return res.status(400).json({ status: 'error', message: 'Required fields are not present' });
  }

  try {
    await taskService.createTask(req.body);
    return res.json({ status: 'success', message: 'Task added successfully!' });
  } catch (error) {
    handleError(res, error);
  }
};

const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await taskService.getAllTasks();
    if (!tasks.length) {
      return res.status(404).json({ status: 'error', message: 'No tasks found' });
    }
    return res.json({ status: 'success', message: 'Tasks found', data: tasks });
  } catch (error) {
    handleError(res, error);
  }
}

const getTaskByUserId = async (req, res, next) => {
  const { userId } = req.params;
  if (!userId) {
    return res.status(400).json({ status: 'error', message: 'Required fields are not present' });
  }

  try {
    const tasks = await taskService.getTasksByUserId(userId);
    if (!tasks.length) {
      return res.status(404).json({ status: 'error', message: 'No tasks found' });
    }
    return res.json({ status: 'success', message: 'Tasks found', data: tasks });
  } catch (error) {
    handleError(res, error);
  }
};

const updateById = async (req, res, next) => {
  const { taskId } = req.params;
  if (!taskId) {
    return res.status(400).json({ status: 'error', message: 'Required fields are not present' });
  }

  try {
    const updatedTask = await taskService.updateTaskById(taskId, req.body);
    if (!updatedTask) {
      return res.status(404).json({ status: 'error', message: 'Task not found' });
    }
    return res.json({ status: 'success', message: 'Task updated successfully!' });
  } catch (error) {
    handleError(res, error);
  }
};

const deleteTask = async (req, res, next) => {
  const { taskId } = req.params;
  if (!taskId) {
    return res.status(400).json({ status: 'error', message: 'Required fields are not present' });
  }

  try {
    const deletedTask = await taskService.deleteTaskById(taskId);
    if (!deletedTask) {
      return res.status(404).json({ status: 'error', message: 'Task not found' });
    }
    return res.json({ status: 'success', message: 'Task deleted successfully!' });
  } catch (error) {
    handleError(res, error);
  }
};

module.exports = {
  createTask,
  getTaskByUserId,
  updateById,
  deleteTask,
  getAllTasks
};
