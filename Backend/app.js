const express = require('express');
const UserRouter = require('./Router/user.router');
const PORT = process.env.PORT || 8000;
const app = express();

app.use('/users',UserRouter)
app.use(express.json());



app.listen(PORT, ()=>{
    console.log(`Server is running ${PORT}`);
});