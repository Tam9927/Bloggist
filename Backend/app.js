const express = require('express');
const app = express();
const db = require('./Configs/db.config');
const UserRouter = require('./Router/user.router');
const PORT = process.env.PORT || 8000;

app.use('/users',UserRouter)
app.use(express.json());





app.listen(PORT, ()=>{
    console.log(`Server is running ${PORT}`);
});

module.exports = app;