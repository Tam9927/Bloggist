"use strict";
const express = require("express");
const UserService = require("../services/user.service");
const contentNegotiation = require("../utils/content-negotiation");
const paginator = require("../utils/pagination");
require("dotenv").config();

async function getAllUsers(req, res) {
  try {
    const [pageNumber, pageSize] = paginator(req);

    const allUsers = await UserService.findAllUsers(pageNumber, pageSize);
    contentNegotiation.sendResponse(req, res, 200, allUsers.message);
  } catch (err) {
    res.status(err.status).send(err.message);
  }
}

async function getUserByUsername(req, res) {
  try {
    if (!req.params.username) {
      return res.status(400).send({ message: "Invalid request parameter!" });
    }

    const User = await UserService.findUserByUserName(req.params.username);
    contentNegotiation.sendResponse(req, res, 200, User.message);
  } catch (err) {
    res.status(err.status).send(err.message);
  }
}

async function updateUser(req, res) {
  try {
    const updatedUser = await UserService.updateUser(
      req.params.username,
      req.body
    );
    contentNegotiation.sendResponse(req, res, 200, updatedUser.message);
  } catch (err) {
    res.status(err.status).send(err.message);
  }
}

async function deleteUser(req, res) {
  try {
    if (!req.params.username) {
      return res.status(400).send({ message: "Invalid request parameter!" });
    }
    const deletedUser = await UserService.deleteUser(req.params.username);
    contentNegotiation.sendResponse(req, res, 200, deletedUser.message);
  } catch (err) {
    res.status(err.status).send(err.message);
  }
}

module.exports = {
  getAllUsers,
  getUserByUsername,
  deleteUser,
  updateUser,  
};
