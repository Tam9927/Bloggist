const { validate } = require("email-validator");
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
      unique: true,
      validate:{
          notNull:{msg:'Please enter your username'}
          },
          isAlphanumeric:{msg:'Username must be Alphanumeric'}
      },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:{
        notNull:{msg:'Please enter your email'}
        },
         isEmail:{
           msg: 'Email address is not valid!'
       }
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

// async function SyncTable(){

// await user.sequelize.sync({ force: true });

// console.log("All models were synchronized successfully.");

// }

// (async () => {
//   await sequelize.sync({ force: true });
//   // Code here
// })();


module.exports = user;
//user===sequelie.models