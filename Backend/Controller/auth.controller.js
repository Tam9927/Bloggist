require("dotenv").config();
const authService = require("../Services/auth.service");
const userUtils = require("../utils/user.utils");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
  try {
    const data = await authService.register(req.body);

    if (data) {
      res
        .status(200)
        .cookie("jwt", userUtils.generateToken(req.params.username), {
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
    const data = await authService.login(req.body);
    //console.log(data);
    if (data) {
      res
        .status(200)
        .cookie("jwt", userUtils.generateToken(req.params.username), {
          httpOnly: true,
        })
        .json({
          success: true,
        });

      console.log(userUtils.generateToken(req.params.username));
    } else {
      res.status(400).send("Incorrect username or password");
    }
  } catch (err) {
    res.status(400).send("An error occured");
  }
}

module.exports = { registerUser, loginUser };
