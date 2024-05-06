const express = require("express");
const router = express.Router();
const { validateTask } = require("../middleware/validationMiddleware");

const statusController = require("../controller/statusController");

router.get("/status", [validateTask], statusController.getStatus);

module.exports = router;
