"use strict";
require("dotenv").config();
const { validate } = require("email-validator");
const { DataTypes } = require("sequelize");
const { sequelize } = require("../configs/db.sequelize.config");

const Blog = sequelize.define(
  "blog",
  {
    blogId: {
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

    authorId: {
      type: DataTypes.UUID,
      foreignKey: true,
      noUpdate: true,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },

    description: {
      type: DataTypes.STRING,
    },
  },

  {
    tableName: "blogs",
  }
);

// user.hasMany(blog, {
//   foreignKey: "authorId",
//   onDelete: "cascade",
// });

// blog.belongsTo(
//   user,
//   { as: "author" },
//   {
//     foreignKey: "authorId",
//   }
// );



module.exports = Blog;
