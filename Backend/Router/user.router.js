const express = require("express");
const UserController = require("../controller/user.controller");

const router = express.Router();

router
  .route("/")
  .get(UserController.getAllUsers)
  .post(UserController.registerUser );

router
  .route("/:username")
  .get(UserController.getUser)
  .put(UserController.updateUser)
  .delete(UserController.deleteUser);

module.exports = router;
