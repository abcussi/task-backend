const express = require("express");
const router = express.Router();

const checkController = require("../controller/healthCheck");

router.get("/health-check", checkController.check);

module.exports = router;
