"use strict";
require("dotenv").config();
const express = require("express");

const app = express();
const router = require("./routers/index");
const db = require("./configs/db.sequelize.config");
const PORT = process.env.PORT || 4000; 
const HOST = process.env.HOST ;

const cookieParser = require("cookie-parser");
const cors = require("cors");

  app.use(cors(
    { 
      origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],   
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
      allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],   
      credentials: true 
    }));  
   


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

app.listen(PORT, HOST, () => {
  console.log(`Server is running ${PORT}`); 
});

module.exports = app;
