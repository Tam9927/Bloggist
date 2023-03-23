<<<<<<< Updated upstream
"use strict";
const express = require("express");
const UserService = require("../services/user.service");
const contentNegotiation = require("../utils/content-negotiation");
const paginator = require("../utils/pagination");
require("dotenv").config();

async function getAllUsers(req, res) {
  try {
    let pagination = paginator(req);
    const pageNumber = pagination[0];
    const pageSize = pagination[1];

    const data = await UserService.findAllUsers(pageNumber, pageSize);
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
=======
const express = require('express');
const UserService = require('../services/user.service');
require('dotenv').config();

async function getAllUsers(req, res) {
    try {
        const data = await UserService.findAllUsers();
        res.status(data.status).send(data.message);
    } catch (err) {
        res.status(err.status).send(err.message);
    }
}

async function getUserByUsername(req, res) {
    if (!req.params.username) {
        return res.status(400).send({ message: 'Invalid request parameter!' });
    }

    const data = await UserService.findUserByUserName(req.body.username);
    res.status(data.status).send(data.message);
}

async function updateUser(req, res) {
    try {
        const data = await UserService.updateUser(req.params.username, req.body);
        res.status(data.status).send('User Updated');
    } catch (err) {
        res.status(err.status).send(err.message);
    }
>>>>>>> Stashed changes
}

async function deleteUser(req, res) {
    try {
        if (!req.params.username) {
            return res.status(400).send({ message: 'Invalid request parameter!' });
        }
        const data = await UserService.deleteUser(req.params.username);
        res.status(data.status).send('User Deleted');
    } catch (err) {
        res.status(err.status).send(err.message);
    }
<<<<<<< Updated upstream
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
=======
}

module.exports = {
    getAllUsers,
    getUserByUsername,
    deleteUser,
    updateUser,
>>>>>>> Stashed changes
};
