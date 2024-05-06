const express = require("express");
const router = express.Router();
const { JwtAuthenticate } = require("../middleware/authMiddleware");

const statusController = require("../controller/statusController");

router.get("/status", [JwtAuthenticate], statusController.getStatus);

module.exports = router;
