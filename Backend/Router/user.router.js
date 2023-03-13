const express = require('express');
const UserController = require('../Controller/UserController')


const router = express.Router();

//UserRouter.ROUTE('/')
//.get
//,post



router.get("/", UserController.getAllUsers)
router.get("/:username", UserController.getUser)
router.post("/",UserController.createUser)
router.put("/:username" , UserController.updateUser);
router.delete("/:username",UserController.deleteUser);


module.exports = router;
