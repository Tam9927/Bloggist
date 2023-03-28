"use strict"

const express = require("express");
const UserService = require("../services/user.service");
require("dotenv").config();


async function getAllUsers(req, res) {
  try {
    const data = await UserService.findAllUsers();
    if(!data.length){
        res.status(200).send("Blog list empty!");
   }
    res.status(data.status).send(data.message);
  } catch (err) {
    res.status(err.status).send(err.message);
  }
}


async function getUserByUsername(req, res) {
  if (!req.params.username) {
    return res.status(400).send({ message: "Invalid request parameter!" });
  }

  const data = await UserService.findUserByUserName(req.params.username);
  res.status(data.status).send(data.message);
}

async function updateUser(req, res) {
  try {
    const data = await UserService.updateUser(req.params.username, req.body);
    res.status(data.status).send("User Updated");
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
    res.status(data.status).send("User Deleted");
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
