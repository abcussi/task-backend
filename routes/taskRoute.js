const express = require("express");
const router = express.Router();

const taskController = require("../controller/taskController");
const { JwtAuthenticate } = require("../middleware/authMiddleware");
const { validateTask } = require("../middleware/validationMiddleware");

// Apply JWT Authentication Middleware
router.use(JwtAuthenticate);

router.post("/", validateTask, taskController.createTask);
router.put("/:taskId", validateTask, taskController.updateById);
router.delete("/:taskId", taskController.deleteTask);
router.get("/:userId", taskController.getTaskByUserId);
router.get("/", taskController.getAllTasks);

module.exports = router;
