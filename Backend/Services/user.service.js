"use strict";
const UserRepository = require("../repository/user.repository");
const userUtils = require("../utils/user.utils");
const UserDTO = require("../dto/user.dto");
const validator = require("email-validator");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
require("dotenv").config();

async function findAllUsers(pageNumber, pageSize) {
  try {
    const offset = (pageNumber - 1) * pageSize;
    const limit = pageSize;

    const data = await UserRepository.getAllUsers(offset, limit);
    if (!data.length) {
      return { status: 200, message: "Users table is empty!" };
    }
    
    const allUsers = [];
    data.forEach((element) => {
      allUsers.push(new UserDTO(element));
    });

    return { status: 200, message: allUsers };
  } catch (err) {
    return { status: 500, message: err };
  }
}

async function findUserByUserName(username) {
  try {
    const result = await UserRepository.getUserByUserName(
      username.toLowerCase()
    );
    if (!result) {
      return { status: 404, message: "User not found" };
    }

    const user = new UserDTO(result);
    return { status: 200, message: user };
  } catch (err) {
    return { status: 500, message: err };
  }
}

async function findUserByEmail(email) {
  const Email = await UserRepository.getUserByEmail(email);
  if (Email) {
    return { status: 200, message: "User Found" };
  }

  return { status: 404, message: "User not found" };
}

async function registerUser(user) {
  try {
    const data = await UserRepository.register(user);
    return data;
  } catch (err) {
    return { status: 500, message: err };
  }
}

async function deleteUser(username) {
  try {
    const result = await UserRepository.deleteUser(username.toLowerCase());

    if (!result) {
      return { status: 404, message: "User not found" };
    }

    return { status: 200, message: "User removed" };
  } catch (err) {
    return { status: 500, message: err };
  }
}

async function updateUser(username, user) {
  try {
    const saltrounds = parseInt(process.env.SALTROUND);
    const salt = await bcrypt.genSalt(saltrounds);

    const hashedPassword = await bcrypt.hash(user.password, salt);

    const result = await UserRepository.updateUser(
      username.toLowerCase(),
      hashedPassword
    );

    if (!result) {
      return { status: 404, message: "User not found" };
    }
    return { status: 200, message: "User updated" };
  } catch (err) {
    return { status: 500, message: err };
  }
}

async function loginUser(username) {
  try {
    const result = await UserRepository.getUserByName(username.toLowerCase());
    if (!result) {
      return { status: 404, message: "Check username or password" };
    }
    return { status: 200, message: result };
  } catch (err) {
    return { status: 400, message: err };
  }
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
