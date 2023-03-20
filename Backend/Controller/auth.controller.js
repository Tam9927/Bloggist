"use strict"

require("dotenv").config();
const authService = require("../Services/auth.service");
const userUtils = require("../utils/user.utils");
const jwt = require("jsonwebtoken");


async function registerUser(req, res) {
  try { 

    const data = await authService.register(req.body);
    const status = data.status;
    if (status != 400) {
      console.log(data.message);
      const accesstoken = userUtils.generateToken(req.params.username);
      res
        .status(200)
        .cookie("jwt", accesstoken, {
          httpOnly: true,
        })
        .json({
          success: true,
        });
    } 
      res.status(data.status).send(data.message);
    
  } catch (err) {
    console.log(err);
    res.status(500).send("An error occurred");
  }
}

async function loginUser(req, res) {
  try {
    const data = await authService.loginUser(req.body);
    const status = data.status;
    if (status!=400) {
      const accesstoken = userUtils.generateToken(req.params.username);
      res
        .status(200)
        .cookie("jwt", accesstoken, {
          httpOnly: true,
        })
        .json({
          success: "logged in",
        });
    } 
      res.status(401).send("Incorrect username or password");
    
  } catch (err) {
    res.status(401).send("An error occurred");
  }
}

async function logoutUser(req, res) {
  try {
    userUtils.removeToken(res);
  } catch (err) {
    res.status(404).send("No user was logged in");
  }
}

module.exports = { registerUser, loginUser, logoutUser };
