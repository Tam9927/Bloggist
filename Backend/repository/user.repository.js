const express = require("express");
const database = require("../Configs/db.config");
const User = require("../Model/user.model");
const controller = require("../Controller/user.controller");
const UserRegisterDTO = require("../DTO/user.register.dto");

async function getAllUsers() {
  try {
    const result = await User.findAll();
    
    return result;
  } catch (err) {
    throw console.error(err);
  }
}

async function getUserByEmail(email) {
  try {
    const result = await User.findAll({
      where: {
        email,
      },
    });

    return result;
  } catch (err) {
    throw console.error(err);
  }
}

async function deleteUser(username) {
  try {
    const result = await User.destroy({
      where: {
        username,
      },
    });

    return result;
  } catch (err) {
    throw console.error(err);
  }
}

async function updateUser(username, password) {
  try {
    const result = await User.update({ password }, { where: { username } });

    return result;
  } catch (err) {
    throw console.error(err);
  }
}

async function register(user) {
  const userToRegister = new UserRegisterDTO(user);
  try {
    const result = await User.create(userToRegister);
    return result;
  } catch (err) {
    throw console.error(err);
  }
}

//REPO FUNCTION EKTAI
async function getUserByName(username) {
  try {
    const result = await User.findOne({ where: { username } });
    return result.dataValues;
  } catch (err) {
    console.log(err.stack);
    throw err;
  }

}

module.exports = {
  getAllUsers,
  getUserByName,
  getUserByEmail,
  deleteUser,
  updateUser,
  register,
};
