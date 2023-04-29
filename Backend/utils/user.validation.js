"use strict";
const validator = require("email-validator");
const jwt = require("jsonwebtoken");

function userValidator(username, email, password) {
  if (!username || !email || !password) {
    return { valid: false, message: "Please enter all the fields" };
  }

  if (!checkUsernameValid(username)) {
    return {
      valid: false,
      message: "Username cannot contain space and special characters!",
    };
  }

  if (!checkEmailValid(email)) {
    return { valid: false, message: "Please enter a valid email" };
  }

  if (!checkPasswordValid(password)) {
    return {
      valid: false,
      message: "Password must contain atleast 6 characters",
    };
  }

  if (!checkPasswordValid(password)) {
    return {
      valid: false,
      message: "Password must contain atleast 6 characters",
    };
  }

  return { valid: true, message: "Credentials are valid" };
}


const checkEmptyBody = (body) => {
  return !Object.keys(body).length ? true : false;
};

function generateToken(username) {
  const accesstoken = jwt.sign({ username }, process.env.ACCESS_TOKEN_SECRET, {
    algorithm: process.env.JWT_ALGO,
    expiresIn: process.env.ACCESS_TOKEN_LIFE,
  });

  return accesstoken;
}

function removeToken(res) {
  res.status(200).clearCookie("jwt").json({
    success: true,
    message: "Logged Out",
  });
}

function checkUsernameValid(username) {
  const usernameValidCheck = /[^A-Za-z0-9]/;

  return usernameValidCheck.test(username) ? false : true;
}

function checkPasswordValid(password) {
  return password.length < 6 ? false : true;
}

function checkEmailValid(email) {
  return validator.validate(email) ? true : false;
}

module.exports = {
  userValidator,
  checkUsernameValid,
  checkPasswordValid,
  checkEmailValid,
  generateToken,
  removeToken,
  checkEmptyBody
};
