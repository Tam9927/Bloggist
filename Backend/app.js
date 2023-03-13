const express = require('express');
const app = express();
const router = require("./Router/index")
const db = require('./Configs/db.config');
const PORT = process.env.PORT || 4000;

db.connectToDB();

 app.use(express.json());


app.use((err, req, res, next) => {
    if(err.name == 'ValidationError'){
        
        var valErrors = [];
    
    valErrors.push('Server Crashed!!!')
        
    Object.keys(err.errors).forEach( key => valErrors.push(err.errors[key].message) );
        res.status(422).send(valErrors)
    }
});

app.use('/api/', router);

app.use('*', (req, res) => {
    res.status(404).json({
      success: 'false',
      message: 'Page not found',
      error: {
        statusCode: 404,
        message: 'You reached a route that is not defined on this server',
      },
    });
});




app.listen(PORT, ()=>{
    console.log(`Server is running ${PORT}`);
});

module.exports = app;