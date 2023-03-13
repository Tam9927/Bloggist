const express = require("express");
const UserController = require("../Controller/user.controller");

const router = express.Router();

router.get("/", UserController.getAllUsers);
router.get("/:username", UserController.getUser);
router.post("/", UserController.createUser);
router.put("/:username", UserController.updateUser);
router.delete("/:username", UserController.deleteUser);

module.exports = router;
