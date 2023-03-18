"use strict"

const UserRepository = require("../repository/user.repository");
const userUtils = require("../utils/user.utils");
const UserDTO = require('../DTO/user.dto')
const validator = require("email-validator");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
require("dotenv").config();

async function findAllUsers() {
  try {
    const data = await UserRepository.getAllUsers();
    if (!data.length) {
      return { status: 200, message: "Users table is empty!" };
    }

    const allUsers = [];
    data.forEach((element) => {
      allUsers.push(new UserDTO(element));
    });

    return { status: 200, message: allUsers };
  } catch {
    return { status: 500, message: "Internal server error!" };
  }
}

async function findUserByUserName(username) {
  try {
    
    const result = await UserRepository.getUserByName(username.toLowerCase());
    if (!result.length) {
      return { status: 404, message: "User not found" };
    }

    const user = new UserDTO(result)
    return { status: 200, message: user };
  } catch {
    return { status: 400, message: "Internal Error" };
  }
}

async function findUserByEmail(email) {
  const user = await UserRepository.getUserByEmail(email);
  if (user.length > 0) {
    return { status: 200, message: user.email };
  }

  return { status: 404, message: "User not found" };
}

async function registerUser(user) {
  
  try {
    const data = await UserRepository.register(user);
    return data;
  } catch {
    return { status: 400, message: "Please check your credentials again" };
  }
}

async function deleteUser(username) {
  try {
    const result = await UserRepository.deleteUser(username.toLowerCase());

    if (!result) {
      return { status: 404, message: "User not found" };
    }

    return { status: 200, message: "User removed" };
  } catch {
    return { status: 400, message: "An Error Occured" };
  }
}

async function updateUser(username, user) {
  try {
    const saltRounds = parseInt(process.env.SALTROUND)
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(user.password, salt);

    const result = await UserRepository.updateUser(
      username.toLowerCase(),
      hashedPassword
    );

    if (!result) {
      return { status: 404, message: "User not found" };
    }
    return { status: 200, message: "User updated" };
  } catch {
    return { status: 400, message: "Update failed" };
  }
}

async function loginUser(username){

  try {
    const result = await UserRepository.getUserByName(username.toLowerCase());
    if (!result.length) {
      return { status: 404, message: "User not found" };
    }
    return { status: 200, message: result };
  } catch {
    return { status: 400, message: "Internal Error" };
  }

}

module.exports = {
  findAllUsers,
  findUserByUserName,
  findUserByEmail,
  deleteUser,
  updateUser,
  registerUser,
  loginUser
};
