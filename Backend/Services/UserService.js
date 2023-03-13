const UserRepository = require("../repository/user.repository");
const userUtils = require("../utils/Validation");
const userDuplicate = require("../utils/Hashing");
const validator = require("email-validator");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const uuid = require("uuid");

function isAlphaNumeric(str) {
  const alphanumericRegex = /^[a-zA-Z0-9]+$/;
  return alphanumericRegex.test(str);
}

async function FindAllUsers() {

   try{ console.log('h')
     const data = await UserRepository.getAllUsers();
      if (data.length == 0) {
        return { status: 200, message: "Users table is empty!" };
     }
    return { status: 200, message: data };
   } catch {
     return { status: 500, message: "Internal server error!" };
   }
  
}

async function FindUser(username) {
  try {
    const result = await UserRepository.getUser(
      username.toLowerCase()
    );
    if (result.length == 0) {
      return { status: 404, message: "User not found" };
    }
    return { status: 200, message: "User Found", result };
  } 
  catch {
    return { status: 404, message: "Some Error" };
  }
}

async function FindEmail(email) {
  
    const duplicateEmail = await UserRepository.getEmail(email);
    if(duplicateEmail.length>0){
      return {status:200, message:"User Found"};
    }
  
    return {status:404, message:'User not found'};
  
}

async function createUser(user) {
  const userValid = userUtils.userValidator(
    user.username,
    user.email,
    user.password
  );
  if (!userValid.valid) {
    return { status: 400, message: userValid.message };
  }

  const usernameDuplicate = await FindUser(user.username);
  if (usernameDuplicate.status == 200) {
    return { status: 400, message: "Username already exists!" };
  }

  const emailDuplicate = await FindEmail(user.email);
  if (emailDuplicate.status == 200) {
    return { status: 400, message: "Email is already in use!" };
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
  } catch {
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
    return { status: 404, message: "Error" };
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

module.exports = {
  FindAllUsers,
  FindUser,
  FindEmail,
  deleteUser,
  createUser,
  updateUser,
};
