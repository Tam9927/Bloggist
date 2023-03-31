"use strict";
const { validate } = require("email-validator");
const { DataTypes } = require("sequelize");
const { sequelize } = require("../configs/db.sequelize.config");

const User = sequelize.define(
  "user",
  {
    Id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: { msg: "Please enter your username" },
      },
      isAlphanumeric: { msg: "Username must be Alphanumeric" },
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: { msg: "Please enter your email" },
      },
      isEmail: {
        msg: "Email address is not valid!",
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      isAlphanumeric: { msg: "Username must be Alphanumeric" },
    },
  },
  {
    tableName: "users",
  }
);

module.exports = User;
