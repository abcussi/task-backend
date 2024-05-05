const express = require("express");
const router = express.Router();

const checkController = require("../controller/healthCheckController");
const { JwtAuthenticate } = require("../middleware/authMiddleware");

router.get("/health-check", [JwtAuthenticate], checkController.check);

module.exports = router;
