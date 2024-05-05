const express = require("express");
const router = express.Router();

const userController = require("../controller/userController");
const { validateUser } = require("../middleware/validationMiddelware");

router.post("/login", [validateUser], userController.authenticate);
router.post('/signup', [validateUser], userController.signup);

module.exports = router;
