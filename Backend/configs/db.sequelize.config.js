"use strict";
const mysql = require("mysql");
const dotenv = require("dotenv");
const { Sequelize } = require("sequelize");

dotenv.config();

const APP_NAME = process.env.APP_NAME;
const TABLENAME = process.env.TABLENAME;

const sequelize = new Sequelize("BloggistDatabase_preventfog", "BloggistDatabase_preventfog", "a7d78f43170b47ca65bc37656021ff6502587ebf", {
  host: "roy.h.filess.io",
  port:3307,
  dialect: "mysql",
});

async function connectToDB() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error); 
  }
}
 
module.exports = { sequelize, connectToDB };  
 