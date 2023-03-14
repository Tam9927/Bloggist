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

  return { valid: true, message: "Credentials are valid" };
}

function generateToken(username) {
  const accesstoken = jwt.sign({ username }, process.env.ACCESS_TOKEN_SECRET, {
    algorithm: "HS256",
    expiresIn: process.env.ACCESS_TOKEN_LIFE,
  });
  return accesstoken;
}

function checkUsernameValid(username) {
  const usernameValidCheck = /[^A-Za-z0-9]/;
  if (usernameValidCheck.test(username)) {
    return false;
  }
  return true;
}

function checkPasswordValid(password) {
  if (password.length < 6) {
    return false;
  }
  return true;
}

function checkEmailValid(email) {
  if (validator.validate(email)) {
    return true;
  } else {
    return false;
  }
}

module.exports = {
  userValidator,
  checkUsernameValid,
  checkPasswordValid,
  checkEmailValid,
  generateToken,
};