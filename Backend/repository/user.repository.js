

const { query } = require("express");
const db = require("../Configs/db.config");
const controller= require ("../Controller/UserController");



function makeQuery(sql, params) {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (error, results) => {
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

async function createUser(id, name,email,password,username){


  const result = await makeQuery(
    "INSERT INTO users(id, name, email, password, username) VALUES (?, ?, ?, ? , ?) ",
    [id, name, email, password, username]
  );
  console.log("User created successfully");
  return result;


}


async function deleteUser(username){

const result = await makeQuery(
    "DELETE FROM users where `Username` = ?",
    [username]
  );
  return resu

}

async function updateUser (username , password) {

  console.log(username)
  console.log(password)

  const result = await makeQuery(
    "UPDATE users SET `password`= ? where `username` = ?",
    [password,username]
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