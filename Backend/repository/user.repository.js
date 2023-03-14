const express = require("express");
const database = require("../Configs/db.config");
const user = require("../Model/user.model");
const controller = require("../Controller/user.controller");
const UserDTO = require("../DTO/user.dto");

async function getAllUsers() {
  try{
    const result = await user.findAll();

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

async function getUserName(username) {
  try{
    const result = await user.findAll({
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

async function getUserByEmail(email) {
  try{const result = await user.findAll({
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

async function createUser(id, email, password, username) {
  try{
    const result = await user.create({ id, email, password, username });

  console.log("User created successfully");
  return result;
  }
  catch (err) {
    throw console.error(err);
  }

}

async function deleteUser(username) {
  try{
    const result = await user.destroy({
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
    const result = await user.update(
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

module.exports = {
  getAllUsers,
  getUserName,
  getUserByEmail,
  createUser,
  deleteUser,
  updateUser,
};
