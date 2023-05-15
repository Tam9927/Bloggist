"use strict";
const UserRepository = require("../repositories/user.repository");
const UserDTO = require("../dto's/user.dto");
const { hashPasswordGenerator } = require("../utils/hashingUtil");
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

  return { message: allUsers };
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
  return { message: user };
}

async function findDuplicateEmail(email) {
  const Email = await UserRepository.getUserByEmail(email);
  return Email;
}

async function findDuplicateUsername(username) {
  const User = await UserRepository.getUserByUserName(username.toLowerCase());
  return User;
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

  return { message: "User removed" };
}

async function updateUser(username, user) {
  const hashedPassword = await hashPasswordGenerator(user.password);
  const updatedUser = await UserRepository.updateUser(
    username.toLowerCase(),
    hashedPassword
  );

  if (!updatedUser) {
    throw Object.assign(new Error("User not found!"), { status: 404 });
  }
  return { message: "User updated" };
}

async function loginUser(username) {
  const userToLogin = await UserRepository.getUserByUserName(
    username.toLowerCase()
  );
  if (!userToLogin) {
    {
      throw Object.assign(new Error("Username not found"), { 
        status: 400,
      });
    }
  }
  return { message: userToLogin };
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
