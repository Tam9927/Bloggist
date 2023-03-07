const express = require('express');
const UserController = require('../Controller/UserController')


const UserRouter = express.Router();

//UserRouter.ROUTE('/')
//.get
//,post

UserRouter.get('/users', UserController.getAllUsers)
          .get('/user/:id', UserController.getUser)
          .post('/user',UserController.CreateUser)
          .put('/user/:id',UserController.UpdateUser)
          .delete('/users',UserController.DeleteUser);
          



module.exports = UserRouter;
