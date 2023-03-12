const  {DataTypes}  = require("sequelize");
const {sequelize} = require("../Configs/db.config");

const user = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: "users",
  }
);

// (async () => {
//     await User.sync({ alter: true });
//     const allUsers = await User.findAll();
//     console.log(allUsers.dataValues);
// })();


module.exports = user;