require("dotenv").config();
const authService = require("../Services/auth.service");
const userUtils = require("../utils/user.utils");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
  try {
    const data = await authService.register(req.body);

    if (data) {
      const accesstoken = userUtils.generateToken(req.params.username);
      res
        .status(200)
        .cookie("jwt", accesstoken, {
          httpOnly: true,
        })
        .json({
          success: true,
        });
    } else {
      res.status(data.status).send(data.message);
    }
  } catch (err) {
    console.log(err);
    res.status(400).send("An error occured");
  }
}

async function loginUser(req, res) {
  try {
    const data = await authService.loginUser(req.body);
    if (data) {
      const accesstoken = userUtils.generateToken(req.params.username);
      res
        .status(200)
        .cookie("jwt", accesstoken, {
          httpOnly: true,
        })
        .json({
          success:"logged in",
        });
    } else {
      res.status(401).send("Incorrect username or password");
    }
  } catch (err) {
    res.status(401).send("An error occured");
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
