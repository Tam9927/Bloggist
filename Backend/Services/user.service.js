"use strict";
const UserRepository = require("../repository/user.repository");
const userUtils = require("../utils/user.validation");
const UserDTO = require("../dto/user.dto");
const validator = require("email-validator");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
require("dotenv").config();

async function findAllUsers(pageNumber, pageSize) {
    const offset = (pageNumber - 1) * pageSize;
    const limit = pageSize;

    const Users = await UserRepository.getAllUsers(offset, limit);
    if (!Users.length) {
      return { status: 200, message: "Users table is empty!" };
    }
    
    const allUsers = [];
    Users.forEach((element) => {
      allUsers.push(new UserDTO(element));
    });

    return { status: 200, message: allUsers };
}

async function findUserByUserName(username) {
    const foundUser = await UserRepository.getUserByUserName(
      username.toLowerCase()
    );
    if (!foundUser) {
      return { status: 404, message: "User not found" };
    }

    const user = new UserDTO(foundUser);
    return { status: 200, message: user };
}

async function findUserByEmail(email) {
  const Email = await UserRepository.getUserByEmail(email);
  if (!Email.length) {
    return { status: 404, message: "User not found" };
  }

  return { status: 200, message: Email };
}

async function registerUser(user) {
    const registeredUser = await UserRepository.register(user);
    return registeredUser;
}

async function deleteUser(username) {
    const deletedUser = await UserRepository.deleteUser(username.toLowerCase());

    if (!deletedUser) {
      return { status: 404, message: "User not found" };
    }

    return { status: 200, message: "User removed" };
}

async function updateUser(username, user) {

    const hashedPassword = await Hasher(user.password);
    const updatedUser = await UserRepository.updateUser(
      username.toLowerCase(),
      hashedPassword
    );

    if (!updatedUser) {
      return { status: 404, message: "User not found" };
    }
    return { status: 200, message: "User updated" };
}

async function loginUser(username) {
    const userToLogin = await UserRepository.getUserByUserName(username.toLowerCase());
    if (!userToLogin) {
      return { status: 404, message: "Check username or password" };
    }
    return { status: 200, message: userToLogin };
}

module.exports = {
  findAllUsers,
  findUserByUserName,
  findUserByEmail,
  deleteUser,
  updateUser,
  registerUser,
  loginUser,
};
