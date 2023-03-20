require("dotenv").config();
const { validate } = require("email-validator");
const { DataTypes } = require("sequelize");
const { sequelize } = require("../Configs/db.config");
const user = require("./user.model");

const blog = sequelize.define(
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

    description: {
      type: DataTypes.STRING,
    },

    authorId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      notNull: true,
      notEmpty: true,
    },
  },

  {
    tableName: "blogs",
  }
);

user.hasMany(blog, {
  foreignKey: "authorid",
});

blog.belongsTo(user, {
  foreignKey: "authorId",
});

async function test() {
  await blog.sync();
  console.log("Blog synchronized successfully.");
}

test();

module.exports = blog;
