<<<<<<< Updated upstream
'use strict'
const express = require("express");
const UserController = require("../controller/user.controller");
=======
const express = require('express');
const UserController = require('../controller/user.controller');
>>>>>>> Stashed changes

const router = express.Router();

router.route('/').get(UserController.getAllUsers);

router
<<<<<<< Updated upstream
  .route("/:username")
  .get(UserController.getUser)
  .put(UserController.updateUser)
  .delete(UserController.deleteUser);
=======
    .route('/:username')
    .get(UserController.getUserByUsername)
    .put(UserController.updateUser)
    .delete(UserController.deleteUser);
>>>>>>> Stashed changes

module.exports = router;
