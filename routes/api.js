const express = require('express');
const router = express.Router();

const apiController = require('../controller/api');
const authenticate = apiController.authenticate;

router.use('/', authenticate);


module.exports = router;