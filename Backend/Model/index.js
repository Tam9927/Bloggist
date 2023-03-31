const User = require("./user.model");
const Blog = require("./blog.model")
const {sequelize} = require("../configs/db.config")


  
  Blog.belongsTo(
    User,
    { as: "author" },
    {
      foreignKey: "authorId", 
      onDelete: "cascade",
      hooks: true
    }
  );

  User.hasMany(Blog, {
    foreignKey: "authorId",
  });

  async function test() {
    await sequelize.sync({ force: false });
    console.log("User and Blog tables were synchronized successfully.");
  }
  
  
  test(); 

  module.exports = {User,Blog}  
  

