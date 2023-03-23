<<<<<<< Updated upstream
"use strict";
const mysql = require("mysql");
const dotenv = require("dotenv");
const { Sequelize } = require("sequelize");
=======
const mysql = require('mysql');
const dotenv = require('dotenv');
const { Sequelize } = require('sequelize');
>>>>>>> Stashed changes

dotenv.config();

const { APP_NAME } = process.env;
const { TABLENAME } = process.env;

<<<<<<< Updated upstream
const sequelize = new Sequelize("bloggist", "root", "", {
  host: "localhost",
  dialect: "mysql",
=======
const sequelize = new Sequelize('bloggist', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
>>>>>>> Stashed changes
});

async function connectToDB() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = { sequelize, connectToDB };
