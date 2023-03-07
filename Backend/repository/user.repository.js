

const { query } = require("express");
const db = require("../Configs/db.config");
const controller= require ("../Controller/UserController");

getAll = async()=> {

        const results = await query(`SELECT * FROM users`);
        return results;
      
    }

    getUserByName = async()=>{

        const results = await query(`SELECT * FROM users WHERE Username = ?`);
        return results;
      
    }





module.exports = {

getAll,
getUserByName

}