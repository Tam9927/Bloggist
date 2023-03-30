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
    throw Object.assign(new Error(userValid.message), { status: 400 });
  }

  const usernameDuplicate = await UserService.findDuplicateUsername(user.username);
  if (usernameDuplicate.status === 200) {
    throw Object.assign(new Error("Username is already in use!"), { status: 400 });
  }
  const emailDuplicate = await UserService.findDuplicateEmail(user.email);
  if (emailDuplicate.status === 200) {
    throw Object.assign(new Error("Email is already in use!"), { status: 400 });
  }

    const hashedPassword = await Hasher(user.password);
    user.password = hashedPassword;

    const registeredUser = await UserService.registerUser(user);
    return { status: 200, message: registeredUser };
    
}

async function loginUser(user) {
    const name = user.username.toLowerCase();
    const userExists = await UserService.loginUser(name);
    const password = userExists.message.password;
    const validPass = await bcrypt.compare(user.password, password);

      if (!validPass) {
        throw Object.assign(new Error("Incorrect Password Entered!"), { status: 400 });
      }
      return { status: 200, message: userExists};
    }


module.exports = { register, loginUser };
