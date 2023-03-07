const express = require ('express');
const UserService = require('../Services/UserService')

async function getAllUsers (req,res)
{
    
    try {
        res.send(await UserService.FindAllUsers());
      } 
      
      catch (err) {
        console.error(err);
        res.send({ status: 500, message: err });
      }

};

async function getUser(req,res) 
{
    try {
        const id = req.params.id;
        res.send(await UserService.FindUser(id));
      } catch (err) {
        console.error(err);
        res.send({ status: 500, message: err});
      }

};



module.exports =
{

    getAllUsers,
    getUser

}








