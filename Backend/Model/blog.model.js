require("dotenv").config();
const { validate } = require("email-validator");
const { DataTypes } = require("sequelize");
const { sequelize } = require("../Configs/db.config");

const blog = sequelize.define(
  "blog",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    title: {
      type: DataTypes.STRING,
      notNull: true,
      notEmpty: true,
      defaultValue: "Untitled Blog",
    },

    description: {
      type: DataTypes.STRING,
    },

    authorId: {
      type: DataTypes.UUID,
      notNull: true,
      notEmpty: true,
    },
  },
  {
    tableName: "blogs",
  }
);

async function test() {
  await sequelize.sync();
  console.log("Blog synchronized successfully.");
} 

test();

module.exports = blog;
