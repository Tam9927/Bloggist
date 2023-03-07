const express = require('express');
const UserController = require('../Controller/UserController')


const UserRouter = express.Router();

//UserRouter.ROUTE('/')
//.get
//,post


UserRouter.get("/", UserController.getAllUsers)
//UserRouter.get("/")
UserRouter.post("/:username",UserController.getUser)
UserRouter.put("/:username")
UserRouter.delete("/:username")



        
module.exports = UserRouter;
