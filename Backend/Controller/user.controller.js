const express = require('express');
const UserService = require('../Services/user.service');




async function getAllUsers(req, res) {
  const data = await UserService.findAllUsers();
  res.status(data.status).send(data.message);
}

async function getUser(req, res) {
  if (!req.params.username) {
    return res.status(400).send({ message: "Invalid request parameter!" });
  }

  const data = await UserService.findUserName(req.params.username);
  res.status(data.status).send(data.message);
}

async function createUser(req, res) {

  const data = await UserService.createUser(req.body);
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
  getUser,
  createUser,
  deleteUser,
  updateUser,
};
