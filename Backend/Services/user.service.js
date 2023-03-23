<<<<<<< Updated upstream
'use strict'
const UserRepository = require("../repository/user.repository");
const userUtils = require("../utils/user.utils");
const UserDTO = require("../dto/user.dto");
const validator = require("email-validator");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const uuid = require("uuid");

async function findAllUsers(pageNumber,pageSize) {
  try {
    const data = await UserRepository.getAllUsers(pageNumber,pageSize);
    if (data.length == 0) {
      return { status: 200, message: "Users table is empty!" };
=======
const validator = require('email-validator');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const userUtils = require('../utils/user.utils');
const UserDTO = require('../dto/user.dto');
const UserRepository = require('../repository/user.repository');
require('dotenv').config();

async function findAllUsers() {
    try {
        const data = await UserRepository.getAllUsers();
        if (!data.length) {
            return { status: 200, message: 'Users table is empty!' };
        }

        const allUsers = [];
        data.forEach((element) => {
            allUsers.push(new UserDTO(element));
        });

        return { status: 200, message: allUsers };
    } catch {
        return { status: 500, message: 'Internal server error!' };
>>>>>>> Stashed changes
    }
}

async function findUserByUserName(username) {
<<<<<<< Updated upstream
  try {
    const result = await UserRepository.getUserByName(username.toLowerCase());
    if (result.length == 0) {
      return { status: 404, message: "User not found" };
    }

    const user = new UserDTO(result);
    return { status: 200, message: user };
  } catch {
    return { status: 400, message: "Internal Error" };
  }
}

async function findByEmail(email) {
  const Email = await UserRepository.getUserByEmail(email);
  if (Email.length > 0) {
    return { status: 200, message: "User Found" };
  }
=======
    try {
        const result = await UserRepository.getUserByUserName(username.toLowerCase());
        if (!result) {
            return { status: 404, message: 'User not found' };
        }

        const user = new UserDTO(result);
        return { status: 200, message: user };
    } catch {
        return { status: 400, message: 'Error' };
    }
}

async function findUserByEmail(email) {
    const user = await UserRepository.getUserByEmail(email);
    if (user.length > 0) {
        return { status: 200, message: user.email };
    }
>>>>>>> Stashed changes

    return { status: 404, message: 'User not found' };
}

async function registerUser(user) {
<<<<<<< Updated upstream
  try {
    const data = await UserRepository.register(user);
    return { status: 200, message: data}
  } catch {
    return { status: 400, message: "Please check your credentials again" };
  }
=======
    try {
        const data = await UserRepository.register(user);
        return { status: 200, message: data };
    } catch {
        return { status: 400, message: 'Please check your credentials again' };
    }
>>>>>>> Stashed changes
}

async function deleteUser(username) {
    try {
        const result = await UserRepository.deleteUser(username.toLowerCase());

        if (!result) {
            return { status: 404, message: 'User not found' };
        }

        return { status: 200, message: 'User removed' };
    } catch {
        return { status: 400, message: 'An Error Occured' };
    }
}

async function updateUser(username, user) {
<<<<<<< Updated upstream
  try {
    const saltrounds = parseInt(process.env.SALTROUND);
    const salt = await bcrypt.genSalt(saltrounds);
    const hashedPassword = await bcrypt.hash(user.password, salt);
=======
    try {
        const saltrounds = parseInt(process.env.SALTROUND);
        const salt = await bcrypt.genSalt(saltrounds);
>>>>>>> Stashed changes

        const hashedPassword = await bcrypt.hash(user.password, salt);

<<<<<<< Updated upstream
    if (result == 0) {
      return { status: 404, message: "User not found" };
=======
        const result = await UserRepository.updateUser(username.toLowerCase(), hashedPassword);

        if (!result) {
            return { status: 404, message: 'User not found' };
        }
        return { status: 200, message: 'User updated' };
    } catch {
        return { status: 400, message: 'Update failed' };
>>>>>>> Stashed changes
    }
}

async function loginUser(username) {
<<<<<<< Updated upstream
  try {
    const result = await UserRepository.getUserByName(username.toLowerCase());
    if (!result) {
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
  findByEmail,
  deleteUser,
  updateUser,
  registerUser,
  loginUser,
=======
    try {
        const result = await UserRepository.getUserByUserName(username.toLowerCase());
        if (!result) {
            return { status: 404, message: 'Please Check username or Password' };
        }
        return { status: 200, message: result };
    } catch {
        return { status: 400, message: 'An Error Occurred' };
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
>>>>>>> Stashed changes
};
