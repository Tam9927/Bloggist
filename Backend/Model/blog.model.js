<<<<<<< Updated upstream
'use strict'
require("dotenv").config();
const { validate } = require("email-validator");
const { DataTypes } = require("sequelize");
const { sequelize } = require("../configs/db.config");
const user = require("./user.model");
=======
require('dotenv').config();
const { validate } = require('email-validator');
const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs/db.config');
const user = require('./user.model');
>>>>>>> Stashed changes

const blog = sequelize.define(
    'blog',
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
            defaultValue: 'Untitled Blog',
        },

        description: {
            type: DataTypes.STRING,
        },

        authorid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            noUpdate: true,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
    },

    {
        tableName: 'blogs',
    },
<<<<<<< Updated upstream

    description: {
      type: DataTypes.STRING,
    },
  },

  {
    tableName: "blogs",
  }
=======
>>>>>>> Stashed changes
);

user.hasMany(blog, {
    foreignKey: 'authorid',
});

blog.belongsTo(user, {
<<<<<<< Updated upstream
  foreignKey: "authorId",
});

async function test() {
  await sequelize.sync();
  console.log("Blog synchronized successfully.");
=======
    foreignKey: 'authorId',
});

async function test() {
    await blog.sync();
    console.log('Blog synchronized successfully.');
>>>>>>> Stashed changes
}

test();

module.exports = blog;
