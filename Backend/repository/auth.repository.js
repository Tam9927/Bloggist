'use strict'
const User = require("../model/user.model");
const UserRegisterDTO = require("../dto/user.register.dto");

async function register(user) {
  const userToRegister = new UserRegisterDTO(user);
  try {
    let result = await User.create(userToRegister);
    console.log("User created successfully");
    result = new UserRegisterDTO(result);
    return result;
  } catch (err) {
    throw console.error(err);
  }
}

async function checkUserExists(username) {
  try {
    const result = await User.findOne({ where: { username } });
    return result;
  } catch (err) {
    console.log(err.stack);
    throw err;
  }
}

module.exports = { register, checkUserExists };
