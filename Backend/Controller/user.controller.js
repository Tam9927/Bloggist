"use strict"

const express = require("express");
const UserService = require("../Services/user.service");
require("dotenv").config();


async function getAllUsers(req, res) {
  const data = await UserService.findAllUsers();
  res.status(data.status).send(data.message);
}

async function getUserByUsername(req, res) {
  if (!req.params.username) {
    return res.status(400).send({ message: "Invalid request parameter!" });
  }

  const data = await UserService.findUserByUserName(req.params.username);
  res.status(data.status).send(data.message);
}

async function updateUser(req, res) {
  const data = await UserService.updateUser(req.params.username, req.body);
  res.status(data.status).send(data.message);
}

async function deleteUser(req, res) {
  if (!req.params.username) {
    return res.status(400).send({ message: "Invalid request parameter!" });
  }
  const data = await UserService.deleteUser(req.params.username);
  res.status(data.status).send(data.message);
}

module.exports = {
  getAllUsers,
  getUserByUsername,
  deleteUser,
  updateUser,
};
