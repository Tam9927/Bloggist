"use strict";
const userValidator = require("../utils/user.validation");
const UserService = require("../services/user.service");
const Hasher = require("../utils/hashingutil")
const bcrypt = require("bcrypt");
require("dotenv").config();

async function register(user) {
  const userValid = userValidator.userValidator(
    user.username,
    user.email,
    user.password
  );

  if (!userValid.valid) {
    return { status: 400, message: userValid.message };
  }

  const usernameDuplicate = await UserService.findUserByUserName(user.username);
  if (usernameDuplicate.status === 200) {
    return { status: 400, message: "Username already used" };
  }

  const emailDuplicate = await UserService.findUserByEmail(user.email);
  if (emailDuplicate.status === 200) {
    return { status: 400, message: "Email is already in use!" };
  }

  try {
    const hashedPassword = await Hasher(user.password);
    user.password = hashedPassword;

    const registeredUser = await UserService.registerUser(user);
    return { status: 200, message: registeredUser };
  } catch (err) {
    throw err;
  }
}

async function loginUser(user) {
  try {
    const name = user.username.toLowerCase();
    const userExists = await UserService.loginUser(name);
    const password = userExists.message.password;

    if (password) {
      const validPass = await bcrypt.compare(user.password, password);

      if (!validPass) {
        return { status: 404, message: "User Not Found" };
      }
      return { status: userExists.status, message: userExists.message };
    } else {
      return { status: 400, message: "Incorrect Username Or Password" };
    }
  } catch (err) {
    throw err;
  }
}

module.exports = { register, loginUser };
