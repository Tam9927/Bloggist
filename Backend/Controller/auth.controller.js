"use strict";
require("dotenv").config();
const authService = require("../services/auth.service");
const userUtils = require("../utils/user.utils");
const contentNegotiation = require("../utils/content-negotiation");

async function registerUser(req, res) {
  try {
    const data = await authService.register(req.body);

    const status = data.status;
    if (status != 400) {
      const accesstoken = userUtils.generateToken(req.body.username);
      res.cookie("jwt", accesstoken, { httpOnly: true });

      contentNegotiation.sendResponse(req, res, 200, {
        success: true,
      });
    } 
      res.status(data.status).send(data.message);
    
  } catch (err) {
    console.log(err);
    res.status(400).send("An error occured");
  }
}

async function loginUser(req, res) {
  try {
    const data = await authService.loginUser(req.body);
    console.log(data);
    const status = data.status;
    if (status != 400) {
      const accesstoken = userUtils.generateToken(req.body.username);
      res.cookie("jwt", accesstoken, { httpOnly: true });

      contentNegotiation.sendResponse(req, res, 200, {
        success: true,
      });
    } 
      res.status(401).send("Incorrect username or password");
    
  } catch (err) {
    res.status(401).send(err.message);
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
