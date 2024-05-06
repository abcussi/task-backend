const express = require("express");
const router = express.Router();

const userController = require("../controller/userController");
const { validateUser } = require("../middleware/validationMiddleware");
const { JwtAuthenticate } = require("../middleware/authMiddleware");
const { route } = require("./statusRoute");

router.post("/login", [validateUser], userController.authenticate);
router.post('/signup', [validateUser], userController.signup);
router.get('/', [JwtAuthenticate], userController.getAllUsers);
router.post('/find-by-email', [JwtAuthenticate], userController.getUserInfoByEmail);
router.post('/find-name-by-id', [JwtAuthenticate], userController.getNameById);

module.exports = router;
