
const UserRepository = require("../repository/user.repository");
const userUtils = require('../utils/Validation')

require("email-validator");
const crypto=require("crypto"); 
const bcrypt = require("bcrypt");
require('uuid');


function isAlphaNumeric(str) {
    const alphanumericRegex = /^[a-zA-Z0-9]+$/;
    return alphanumericRegex.test(str);
  }
  
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  function checkPassword(password) {
    if (password.length >= 6) {
      return true;
    } else {
      return false;
    }
  }



 async function FindAllUsers () {

const data = await UserRepository.getAllUsers();
return data;

}

async function FindUser(username) {

const result = await UserRepository.getUser(username.toLowerCase());
return result;

}


async function createUser (user) {

  console.log("User");
  console.log(user);
  // console.log(user.email)
  // console.log(user.username)
    
    // const userValid = userUtils.userValidator(user.email,user.password,user.username);

    //  if(!userValid.valid){
    //    return userValid;
    //  }
  
    // const userDuplicate = await userUtils.userDuplicate(user.username, user.email);
    // console.log(userDuplicate);
    // if(userDuplicate.duplicate){
    //   return {status:422, message: "Duplicate username or email"};
    // }
  
    try{
      const id = crypto.randomUUID();
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(user.password,salt);
  
      const data = await UserRepository.createUser(id, user.name,user.email,hashedPassword,user.username.toLowerCase());
      return {status:201, message:'User created successfully'};
    }
    catch{
      return {status:400, message:'Please check your credentials again'};
    }

}

  
async function deleteUser(username){

  try{
    const result = await UserRepository.deleteUser(username.toLowerCase());
    
    if(result.affectedRows === 0){
      return {status:404, message:'User not found'};
    }

    return {status:200, message:'User removed'};
  }
  catch{
    return {status:404, message:'User not found'};
  }



}

async function updateUser (username,user) {


  try{
    //const hashedPassword = await hashPassword(user.password);
    const result = await UserRepository.updateUser( username,user.password);
    
    
    if(result.affectedRows == 0){
      return {status:404, message:'User not found'};
    }
    return {status:200, message:'User updated'};
  }
  catch{
    return {status:400, message:'User update failed'};
  }




}





module.exports =
{

    FindAllUsers,
    FindUser,
    deleteUser,
    createUser,
    updateUser
    
}



