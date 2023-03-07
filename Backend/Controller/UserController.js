const express = require ('express');
const { UserRepository } = require('../repository/user.repository');

const {} = require('../Services/UserService')


async function getAllUsers (req,res)
{
    const userList = UserRepository.findAll();
    return res.send({'status': true, 'data': userList})


};

async function getUser(req,res) 
{
   const userId = req.params.UUid;

   return res.send({'status': true, 'data': userId})
};

async function CreateUser (req,res) 
{

const user = UserService.CreateUser();

};

async function UpdateUser(req,res)
{
    
    const user =UpdateUserById;    
    console.log("Working");
};

async function DeleteUser(req,res) 
{

    const userID = req.params.id;
    const user =DeleteUserById;

};


module.exports =
{

    getAllUsers,
    getUser,
    CreateUser,
    DeleteUser,
    UpdateUser

}








