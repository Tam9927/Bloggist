const express = require("express");
const database = require("../Configs/db.config");
const user = require("../Model/user.model");
const controller = require("../Controller/user.controller");
const UserDTO = require("../DTO/user.dto");

async function getAllUsers() {
  const result = await user.findAll();

  const allUsers = [];

  result.forEach((element) => {
    allUsers.push(new UserDTO(element));
  });

  console.log(allUsers);
  return allUsers;
}

async function getUserName(username) {
  const result = await user.findAll({
    where: {
      username,
    },
  });

  return result;
}

async function getUserByEmail(email) {
  const result = await user.findAll({
    where: {
      email,
    },
  });

  return result;
}

async function createUser(id, email, password, username) {
  const result = await user.create({ id, email, password, username });

  console.log("User created successfully");
  return result;
}

async function deleteUser(username) {
  const result = await user.destroy({
    where: {
      username,
    },
  });

  console.log(result);
  return result;
}

async function updateUser(username, password) {
  const result = await user.update(
    { password: updatedPassword },
    { where: { username: username } }
  );
  console.log(result);
  return result;
}

module.exports = {
  getAllUsers,
  getUserName,
  getUserByEmail,
  createUser,
  deleteUser,
  updateUser,
};
