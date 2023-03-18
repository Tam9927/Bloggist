"use strict"

const express = require("express");
const UserController = require("../Controller/user.controller");

const router = express.Router();

router
  .route("/")
  .get(UserController.getAllUsers)
  .post(UserController.createUser);

router
  .route("/:username")
  .get(UserController.getUserByUsername)
  .put(UserController.updateUser)
  .delete(UserController.deleteUser);

module.exports = router;
