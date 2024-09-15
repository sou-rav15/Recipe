const express= require('express');
const dbConnection = require('./databaseConnection/db');
const app= express();
const bodyparser=require('body-parser');
const cors= require('cors');
const path =require('path');
//Routes
const Register= require('./routers/Register.js');
const Login =require('./routers/Login.js');
const Recipe= require('./routers/Recipe.js');
const Favourites= require('./routers/Likes.js');
const PORT= process.env.PORT ;
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(bodyparser.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.get('/',(req,res)=>{
    res.send('heyyy');
});

app.use('/register',Register);
app.use('/sharerecipe',Recipe);
app.use('/login',Login);
app.use('/favourite',Favourites);
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    
})

// db connection

dbConnection();