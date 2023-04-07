"use strict";
const userValidator = require("../utils/user.validation");
const UserService = require("../services/user.service");
const { hashPasswordGenerator } = require("../utils/HashingUtil");
const bcrypt = require("bcrypt");
require("dotenv").config();

async function register(user) {
  const userValid = userValidator.userValidator(
    user.username,
    user.email,
    user.password
  );

  if (!userValid.valid) {
    throw Object.assign(new Error(userValid.message), { status: 400 });
  }

  const usernameDuplicate = await UserService.findDuplicateUsername(
    user.username
  );
  if (usernameDuplicate) {
    throw Object.assign(new Error("Username is already in use!"), {
      status: 400,
    });
  }
  const emailDuplicate = await UserService.findDuplicateEmail(user.email);
  if (emailDuplicate) {
    throw Object.assign(new Error("Email is already in use!"), { status: 400 });
  }

  const hashedPassword = await hashPasswordGenerator(user.password);
  user.password = hashedPassword;

  const registeredUser = await UserService.registerUser(user);
  return { message: registeredUser };
}

async function loginUser(user) {
  const name = user.username.toLowerCase();
  const userExists = await UserService.loginUser(name);
  const password = userExists.message.password;
  const validPass = await bcrypt.compare(user.password, password);

  if (!validPass) {
    throw Object.assign(new Error("Incorrect Password Entered!"), {
      status: 400,
    });
  }
  return { message: userExists };
}

module.exports = { register, loginUser };
