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
    throw Object.assign(new Error("No user in users table!"), {
      status: 404,
    });
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
    throw Object.assign(new Error("Username doesn't exist!"), {
      status: 404,
    });
  }

  const user = new UserDTO(foundUser);
  return { status: 200, message: user };
}

async function findDuplicateEmail(email) {
  const Email = await UserRepository.getUserByEmail(email);
  if (Email) {
    return { status: 200 };
  }
  return { status: 400 };
}

async function findDuplicateUsername(username) {
  const User = await UserRepository.getUserByUserName(username);
  if (User) {
    return { status: 200 };
  }
  return { status: 400 };
}

async function registerUser(user) {
  const registeredUser = await UserRepository.register(user);
  return registeredUser;
}

async function deleteUser(username) {
  const deletedUser = await UserRepository.deleteUser(username.toLowerCase());

  if (!deletedUser) {
    throw Object.assign(new Error("User not found!"), { status: 404 });
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
    throw Object.assign(new Error("User not found!"), { status: 404 });
  }
  return { status: 200, message: "User updated" };
}

async function loginUser(username) {
  const userToLogin = await UserRepository.getUserByUserName(
    username.toLowerCase()
  );
  if (!userToLogin) {
    {  throw Object.assign(new Error("User Not Found!"), { status: 400 }); };
  }
  return { status: 200, message: userToLogin };
}

module.exports = {
  findAllUsers,
  findUserByUserName,
  findDuplicateEmail,
  findDuplicateUsername,
  deleteUser,
  updateUser,
  registerUser,
  loginUser,
};
