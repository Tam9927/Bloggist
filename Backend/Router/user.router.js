const express = require('express');
const UserController = require('../Controller/UserController')


const UserRouter = express.Router();

//UserRouter.ROUTE('/')
//.get
//,post


UserRouter.get("/", UserController.getAllUsers)
UserRouter.get("/:username", UserController.getUser)
UserRouter.post("/",UserController.createUser)
UserRouter.put("/:username" , UserController.updateUser);
UserRouter.delete("/:username",UserController.deleteUser);



        
module.exports = UserRouter;
