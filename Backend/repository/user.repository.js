

const db = require("../Configs/db.config");

  
    async function findAll() {
      try{
          const data = await db.query("SELECT * FROM users");
          console.log(data.rows);
          return data;
        } catch(err){
          console.log(err.stack);
        }
    }

    async function findById(id) {
        try{
            const data = await db.query("SELECT * FROM users WHERE Id = $1", [id]);
            console.log(data.rows);
            return data;
          } catch(err){
            console.log(err.stack);
          }
      }




module.exports = {

findAll,
findById,

};