const express = require('express');
const router = express.Router();

const taskController = require('../controller/taskController');
const { JwtAuthenticate } = require('../middleware/authMiddleware');
const { validateTask } = require("../middleware/validationMiddleware");

router.post('/', [JwtAuthenticate, validateTask],taskController.createTask);
router.get('/:userId', [JwtAuthenticate],taskController.getTaskByUserId);
router.put('/:taskId', [JwtAuthenticate, validateTask],taskController.updateById);
router.delete('/:taskId', [JwtAuthenticate],taskController.deleteTask);
router.get('/', [JwtAuthenticate],taskController.getAllTasks);

module.exports = router;