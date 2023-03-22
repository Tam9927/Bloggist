"use strict";
const express = require("express");
const UserService = require("../services/user.service");
const contentNegotiation = require("../utils/content-negotiation");
require("dotenv").config();

async function getAllUsers(req, res) {
  try {
    const data = await UserService.findAllUsers();
    contentNegotiation.sendResponse(req, res, 200, data.message);
  } catch (err) {
    res.status(err.status).send(err.message);
  }
}

async function getUser(req, res) {
  try {
    if (!req.params.username) {
      return res.status(400).send({ message: "Invalid request parameter!" });
    }

    const data = await UserService.findUserByUserName(req.params.username);
    contentNegotiation.sendResponse(req, res, 200, data.message);
  } catch (err) {
    res.status(err.status).send(err.message);
  }
}

async function updateUser(req, res) {
  try {
    const data = await UserService.updateUser(req.params.username, req.body);
    contentNegotiation.sendResponse(req, res, 200, "User updated");
  } catch (err) {
    res.status(err.status).send(err.message);
  }
}

async function deleteUser(req, res) {
  try {
    if (!req.params.username) {
      return res.status(400).send({ message: "Invalid request parameter!" });
    }
    const data = await UserService.deleteUser(req.params.username);
    contentNegotiation.sendResponse(req, res, 200, "User deleted");
  } catch (err) {
    res.status(err.status).send(err.message);
  }
}

module.exports = {
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
};
