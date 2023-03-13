 const express =require("express");
const database = require("../Configs/db.config");
const user = require("../Model/UserModel")
const controller= require ("../Controller/UserController");
const UserDTO = require('../DTO/user.dto')


function doQuery(sql, params) {
  return new Promise((resolve, reject) => {
    database.db.query(sql, params, (error, results) => {
      if (error) {
        console.log(error.sqlMessage);
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}



 async function getAllUsers() {
   
  //const query = "SELECT * FROM users";
  const result = await user.findAll();
  console.log(JSON.stringify(result));

  const allUsers = [];

  result.forEach(element => {

    allUsers.push(new UserDTO(element));

  });

  console.log(allUsers);
  return allUsers;

}

async function getUser(username) {

  const result = await user.findAll({
    where: {
      username
    }
  });
  
  // const result = await doQuery(
  //   "SELECT * FROM users where `username` = ?",
  //   [username]
  // );    

  return result;

}

async function getEmail(email){


  const result = await user.findAll({
    where: {
      email
    }
  });
  // const result = await doQuery(
  //   "SELECT * FROM users where `email` = ?",
  //   [email]
  // );    

  return result;


}

async function createUser(id,email,password,username){


  const result = await user.create({id,email,password,username})
  // const result = await doQuery(
  //   "INSERT INTO users(id,email, password,username,CreatedAt,UpdatedAt) VALUES (?,?, ?, ? ,now(),now()) ",
  //   [id, email, password, username]
  // );
  console.log("User created successfully");
  return result;


}


async function deleteUser(username){

  const result = await user.destroy({
    where: {
      username
    }
  });

  // const result = await doQuery(
//     "DELETE FROM users where `Username` = ?",
//     [username]
//   );
console.log(result);
  return result

}

async function updateUser (username , password) {

  const result = await user.update({password:updatedPassword},{where:{username:username}});
  console.log(result);
  return result;


  
  // await doQuery(
  //   "UPDATE users SET `password`= ?, `updatedAt`=now() where `username` = ?",
  //   [password,username]
  // );
   return result;

}



module.exports = {

getAllUsers,
getUser,
getEmail,
createUser,
deleteUser,
updateUser

}