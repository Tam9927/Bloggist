

const { query } = require("express");
const db = require("../Configs/db.config");
const controller= require ("../Controller/UserController");



function makeQuery(sql, params) {
  return new Promise((resolve, reject) => {
    db.db.query(sql, params, (error, results) => {
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
   
  try{
    const data = "SELECT * FROM users";
    const result = await makeQuery(data);

    return result;
  } catch(err){
    console.log(err.stack);
    throw err;
  }

    }

async function getUser(username) {

  const result = await makeQuery(
    "SELECT * FROM users where `username` = ?",
    [username]
  );    

  return result;
}

async function createUser(name,email,password,username){


  const result = await makeQuery(
    "INSERT INTO users(name, email, password, username) VALUES (?, ?, ? , ?) ",
    [name, email, password,username]
  );
  console.log("User created successfully");
  return result;


}


async function deleteUser(username){

const result = await makeQuery(
    "DELETE FROM users where `Username` = ?",
    [username]
  );
  return result;

}

async function updateUser (username , password) {

  const result = await makeQuery(
    "UPDATE users SET `password`= ? where `username` = ?",
    [username , password]
  );
  return result;

}








module.exports = {

getAllUsers,
getUser,
createUser,
deleteUser,
updateUser

}