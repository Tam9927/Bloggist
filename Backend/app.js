"use strict";
require("dotenv").config();
const express = require("express");

const app = express();
const router = require("./router/index");
const db = require("./configs/db.config");
const PORT = process.env.PORT || 4000;
const cookieParser = require("cookie-parser");

db.connectToDB();

app.use(express.json()); 
app.use(cookieParser());

app.use((err, req, res, next) => {
  if (err.name == "ValidationError") {
    var valErrors = [];

    valErrors.push("Server Crashed!!!");

    Object.keys(err.errors).forEach((key) =>
      valErrors.push(err.errors[key].message)
    );
    res.status(422).send(valErrors);
  }
});

app.use("/api/v1/", router);

app.use("*", (req, res) => {
  res.status(404).json({
    success: "false",
    message: "Page not found", 
    error: {
      statusCode: 404,
      message: "This Route is not Valid",
    },
  });
});

app.listen(PORT, () => {
  console.log(`Server is running ${PORT}`);
});

module.exports = app;
