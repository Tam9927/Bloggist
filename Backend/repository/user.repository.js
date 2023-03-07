

const { query } = require("express");
const db = require("../Configs/db.config");
const controller= require ("../Controller/UserController");

const getAll = async()=> {

        const results = await db.query(`SELECT * FROM users`);
        return results;

    }

    const getUser = async ()=>{

        const results = await db.query(`SELECT * FROM users WHERE Username = ?`);
        return results;
      
    }







module.exports = {

getAll,
getUser

}