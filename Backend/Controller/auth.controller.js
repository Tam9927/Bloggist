"use strict";
require("dotenv").config();
const authService = require("../services/auth.service");
const userUtils = require("../utils/user.validation");
const contentNegotiation = require("../utils/content-negotiation");


async function registerUser(req, res) {
  try {
    if (userUtils.checkEmptyBody) {
      throw Object.assign(new Error("Please Enter All the fields"), {
        status: 400,
      });
    }

    const registeredUser = await authService.register(req.body);
    if (registeredUser.message) {
      const accesstoken = userUtils.generateToken(req.body.username);
      res.cookie("jwt", accesstoken, { httpOnly: true });

      contentNegotiation.sendResponse(req, res, 200, {
        success: true,
      });
    }
      
  } catch (err) {
    res.status(err.status).send(err.message);
  }
}

async function loginUser(req, res) {
  try {
    if (userUtils.checkEmptyBody) {
      throw Object.assign(new Error("Please Enter All the fields"), {
        status: 400,
      });
    }
    const UserToLogin = await authService.loginUser(req.body);
    const message = UserToLogin.message;
    if (UserToLogin) {
      const accesstoken = userUtils.generateToken(req.body.username);
      res.cookie("jwt", accesstoken, { httpOnly: true });

      contentNegotiation.sendResponse(req, res, 200, {
        success: true,
      });
    } 
  } catch (err) {
    res.status(err.status).send(err.message);
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
