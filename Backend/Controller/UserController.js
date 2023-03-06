const express = require ('express');

require('../Model/UserModel');

async function getAllUsers (req,res)
{
console.log("Working");
};


async function getUser(req,res) 
{
console.log("Working");
};

async function CreateUser (req,res) 
{
console.log("Working");
};

async function UpdateUser(req,res)
{
console.log("Working");
};

async function DeleteUser(req,res,next) 
{
console.log("Woring");
};


module.exports =
{

    getAllUsers,
    getUser,
    CreateUser,
    DeleteUser,
    UpdateUser

}








