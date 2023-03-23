<<<<<<< Updated upstream
'use strict'
const express = require("express");
const authController = require("../controller/auth.controller");
=======
const express = require('express');
const authController = require('../controller/auth.controller');

>>>>>>> Stashed changes
const router = express.Router();

router.route('/register').post(authController.registerUser);
router.route('/login').post(authController.loginUser);
router.route('/logout').get(authController.logoutUser);

module.exports = router;
