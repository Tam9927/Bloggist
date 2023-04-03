"use strict";
const express = require("express");
const database = require("../configs/db.sequelize.config");
const {User} = require("../model/index");
const UserRegisterDTO = require("../dto/user.register.dto");

async function getAllUsers(offset, limit) {
  const result = await User.findAll({ offset, limit }); 
  return result;
}

async function getUserByEmail(email) {
  const result = await User.findOne({ where: { email } });
  return result;
}

async function deleteUser(username) {
  const result = await User.destroy({
    where: {
      username,
    },
  });
  console.log(result)

  return result;
}

async function updateUser(username, password) {
  const result = await User.update({ password }, { where: { username } });
  return result;
}

async function register(user) {
  const userToRegister = new UserRegisterDTO(user);
  try {
    const result = await User.create(userToRegister);
    console.log(result)
    return result;
  } catch (err) {
    console.log(err.stack);
    throw err;
  }
}

async function getUserByUserName(username) {
  const result = await User.findOne({ where: { username } });
  return result;
}

module.exports = {
  getAllUsers,
  getUserByUserName,
  getUserByEmail,
  deleteUser,
  updateUser,
  register,
};
