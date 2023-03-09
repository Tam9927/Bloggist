const mysql = require("mysql");
const dotenv = require("dotenv");

dotenv.config();

const APP_NAME = process.env.APP_NAME;
const TABLENAME = process.env.TABLENAME;

//Create connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bloggist",
});

db.connect(function(err) {
    if(err){
      console.log("Error in the connection")
      console.log(err)
    }
    else{
      console.log(`Database Connected`)
      db.query(`SELECT * FROM users`, 
      function (err, result) {
        if(err)
          console.log(`Error executing the query - ${err}`)
        else
          console.log("Result: ",result) 
      })
    }
})

module.exports = {db} ;
