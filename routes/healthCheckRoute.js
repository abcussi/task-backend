const express = require("express");
const router = express.Router();

const checkController = require("../controller/healthCheckController");
const { JwtAuthenticate } = require("../middleware/authMiddelware");

router.get("/health-check", [JwtAuthenticate], checkController.check);

module.exports = router;
