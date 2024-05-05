const express = require("express");
const router = express.Router();

const userController = require("../controller/users");
const { validateUser } = require("../middleware/validation");

router.post("/login", [validateUser], userController.authenticate);
router.post('/signup', [validateUser], userController.signup);

module.exports = router;
