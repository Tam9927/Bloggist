'use strict'
const express = require("express");
const UserController = require("../controller/user.controller");

const router = express.Router();

router
  .route("/")
  .get(UserController.getAllUsers)

router
  .route("/:username")
  .get(UserController.getUserByUsername)
  .put(UserController.updateUser)
  .delete(UserController.deleteUser);

module.exports = router;
