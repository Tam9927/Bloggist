const express = require ('express');
const mysql = require("mysql");

const db = mysql.createConnection({

    host: 'localhost',
    user : 'root',
    password : '',
    database : 'bloggist'

});


db.connect((err)=>{

if(err) {throw err};

console.log("MYSQL Connected ...")
;
})





module.exports = db; 
