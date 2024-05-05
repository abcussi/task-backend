const express = require("express");
const router = express.Router();

const checkController = require("../controller/healthCheck");
const { JwtAuthenticate } = require("../middleware/api");

router.get("/health-check", [JwtAuthenticate], checkController.check);

module.exports = router;
