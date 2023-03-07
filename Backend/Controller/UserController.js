const express = require ('express');
const { UserRepository } = require('../repository/user.repository');

const {} = require('../Services/UserService')


async function getAllUsers (req,res)
{
    
    try {
        res.send(await UserRepository.getAll(req));
      } 
      
      catch (err) {
        console.error(err);
        res.send({ status: 500, message: err });
      }

};

async function getUser(req,res) 
{
    try {
    
        res.send(await userService.getUser(req));
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








