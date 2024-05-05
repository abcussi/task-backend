const express = require("express");
const router = express.Router();

const checkController = require("../controller/healthCheckController");

router.get("/health-check", checkController.check);
router.get("/csrfToken", checkController.csrfToken);

module.exports = router;
