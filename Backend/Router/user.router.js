'use strict'
const express = require("express");
const UserController = require("../controller/user.controller");
const authMiddleware = require("../Middleware/auth.middleware")

const router = express.Router();

router
  .route("/")
  .get(UserController.getAllUsers)

router
  .route("/:username")
  .get(UserController.getUserByUsername)
  .put(authMiddleware,UserController.updateUser)
  .delete(authMiddleware,UserController.deleteUser);

module.exports = router;
