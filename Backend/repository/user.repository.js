const express = require("express");
const database = require("../Configs/db.config");
const User = require("../Model/user.model");
const controller = require("../Controller/user.controller");
const UserDTO = require("../DTO/user.dto");
const UserRegisterDTO = require('../DTO/user.register.dto')

async function getAllUsers() {
  try{
    const result = await User.findAll();

  const allUsers = [];

  result.forEach((element) => {
    allUsers.push(new UserDTO(element));
  });

  console.log(allUsers);
  return allUsers;
}

catch (err) {
  throw console.error(err);
}

}

async function getUserByEmail(email) {
  try{const result = await User.findAll({
    where: {
      email,
    },
  });

  return result;
}

catch (err) {
  throw console.error(err);
}

}


async function deleteUser(username) {
  try{
    const result = await User.destroy({
    where: {
      username,
    },
  });

  return result;
}
catch (err) {
    throw console.error(err);
  }

}

async function updateUser(username, password) {
  try{
    const result = await User.update(
    { password },
    { where: { username,
     }, }
  );

  return result;
    }

    catch (err) {
      throw console.error(err);
    }

}

async function register(user) {
  const userToRegister = new UserRegisterDTO(user);
  try {
    const result = await User.create(userToRegister);
    console.log("User created successfully");
    return result;
  } catch (err) {
    throw console.error(err);
  }
}

async function getUserName(username) {
  try {
    const result = await User.findOne({ where: { username } });
    return result;
  } catch (err) {
    console.log(err.stack);
    throw err;
  }
}

module.exports = {
  getAllUsers,
  getUserName,
  getUserByEmail,
  deleteUser,
  updateUser,
  register,
};
