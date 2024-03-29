'use strict'
const userUtils = require("../utils/user.utils");
const UserService = require("../services/user.service");
const bcrypt = require("bcrypt");
require("dotenv").config();

async function register(user) {
  const userValid = userUtils.userValidator(
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

    const saltRounds = parseInt(process.env.SALTROUND);
    const salt = await bcrypt.genSalt(saltRounds);

    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;

    const result = await UserService.registerUser(user);
    return { status: 200, message: result };
  } catch (err) {
    console.err(err)
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
        return {status:404,message:"User Not Found"};
      }
      return {status:userExists.status,message:userExists.message};
    } else {
      return {status:400,message:"Incorrect Username Or Password"};
    }
  } catch (err) {
    console.err(err)
  }
}

module.exports = { register, loginUser };
