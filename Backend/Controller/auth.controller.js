//json.sign
const jwt = require('jsonwebtoken');
const authService = require('../Services/auth.service');
require('dotenv').config();

async function registerUser(req, res) {
  try {
    const data = await authService.register(req.body);
    if (data) {
      let accesstoken = jwt.sign(
        { username: data.username },
        process.env.ACCESS_TOKEN_SECRET,
        {
          algorithm: "HS256",
          expiresIn: process.env.ACCESS_TOKEN_LIFE,
        }
      );

      res.cookie("jwt", accesstoken, { secure: true, httpOnly: true });

      res.status(200).send(data);
        console.log(data);

    } else {
      res.status(400).send("Please try again");
    }
  }
  catch (err) {
    res.status(400).send("An error occured");
  }
}

async function loginUser(req, res) {
  try {
    const data = await authService.login(req.body);

    if (data) {
      console.log(data);
      let accesstoken = jwt.sign(
        { username: data.username },
        process.env.ACCESS_TOKEN_SECRET,
        {
          algorithm: "HS256",
          expiresIn: process.env.ACCESS_TOKEN_LIFE,
        }
      );

      res.cookie("jwt", accesstoken, { secure: true, httpOnly: true });

      res.status(200).send("User is logged in");
    } else {
      res.status(400).send("Incorrect username or password");
    }
  } catch (err) {
    res.status(400).send("An error occured");
  }
}

module.exports = {registerUser,loginUser}

