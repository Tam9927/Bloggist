const express = require('express');
const app = express();
const UserRouter = require('./Router/user.router')
const db = require('./Configs/db.config');
const PORT = process.env.PORT || 4000;

db.connectToDB();

 app.use(express.json());

app.use('/users', UserRouter)

app.use((err, req, res, next) => {
    if(err.name == 'ValidationError'){
        
        var valErrors = [];
    
    valErrors.push('Server Crashed!!!')
        
    Object.keys(err.errors).forEach( key => valErrors.push(err.errors[key].message) );
        res.status(422).send(valErrors)
    }
});



app.listen(PORT, ()=>{
    console.log(`Server is running ${PORT}`);
});

module.exports = app;