const UserRepository = require("../repository/user.repository");
const userUtils = require("../utils/Validation");
const validator = require("email-validator");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const uuid=require("uuid");

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

async function FindAllUsers() {
  const data = await UserRepository.getAllUsers();
  return data;
}

async function FindUser(username) {
  const result = await UserRepository.getUser(username.toLowerCase());
  return result;
}

async function createUser(user) {
  
  if(user.email == undefined || user.password == undefined ||user.username == undefined){
    return {status:401, message:'Please enter all the fields'};
  }

  if(user.username.length == 0 || user.email.length == 0 || user.password.length == 0){
    return {status:401, message:'Some fields are empty!'};
  }

  if(!checkUsernameValid(user.username)){
    return {status:401, message:'Username cannot contain space and special characters!'};
  }

  if(!checkPasswordValid(user.password)){
    return {status:401, message:'Password must contain atleast 6 characters'};
  }

  if(!checkEmailValid(user.email)){
    return {status:401, message:'Email is not valid'};
  }

  if(await usernameExists(user.username)){
    return {status:401, message: 'Username already exists!'};
  }


try {
    const id = crypto.randomUUID();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);

    const data = await UserRepository.createUser(
      id,
      user.email,
      hashedPassword,
      user.username.toLowerCase()
    );
    return { status: 201, message: "User created successfully" };
  } 
  
    catch {
    return { status: 400, message: "Please check your credentials again" };
  }
}

async function deleteUser(username) {
  try {
    const result = await UserRepository.deleteUser(username.toLowerCase());

    if (result.affectedRows == 0) {
      return { status: 404, message: "User not found" };
    }

    return { status: 200, message: "User removed" };
  } catch {
    return { status: 404, message: "User not found" };
  }
}

async function updateUser(username, user) {
  try {
    //const hashedPassword = await hashPassword(user.password);

    const result = await UserRepository.updateUser(username, user.Password);

    if (result.affectedRows == 0) {
      return { status: 404, message: "User not found" };
    }
    return { status: 200, message: "User updated" };
  } catch {
    return { status: 400, message: "Update failed" };
  }
}


function checkUsernameValid(username){

  const usernameValidCheck = /[^A-Za-z0-9]/;
  if(usernameValidCheck.test(username)){
    return false;
  }
  return true;
}

function checkPasswordValid(password){
  if(password.length < 6){
      return false;
  }
  return true;
}

function checkEmailValid(email){
  if(validator.validate(email)){
      return true;
  }
  else{
      return false;
  }
}

async function usernameExists(username){
const data = await UserRepository.getUser(username);
if(data.length == 0){
  return false;
}
else{
  return true;
}
}




module.exports = {
  FindAllUsers,
  FindUser,
  deleteUser,
  createUser,
  updateUser,
};
