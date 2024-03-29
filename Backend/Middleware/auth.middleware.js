"use strict";

const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    let accessToken = req.cookies.jwt;
    if (!accessToken) {
      return res.status(403).send("Cannot access this route");
    }


    const decode = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET,
      (err, decoded) => {
        if (err) {
          return res.status(400).send("Session expired");
        }
        req.username = decoded.username;
        next();
      }
    );
    
  } catch (err) {

    return res.status(401).send("Invalid JWT token");
  }
};

module.exports = authMiddleware;
