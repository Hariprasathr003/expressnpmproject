const express = require("express");
// const mysql = require("mysql");
const mysql = require('mysql2');

const app=express();
const path=require("path");
const dotenv = require("dotenv");
const  hbs=require("hbs");
 


    //secure db
// dotenv.config({
//     path:"./.my.ini",
// })


       //mysql connection
      

const db=mysql.createConnection({
    // host:process.env.DB_HOST,
    // user:process.env.DB_USER,
    // password:process.env.DB_PASS,
    // database:process.env.DB_NAME

    host: 'localhost', 
    user: 'root',     
    password: '1207', 
    database: 'login_db' 
});


db.connect((err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("mysql connection success");
    }
});

app.use(express.urlencoded({extended:false}));
           
//console.log(__dirname);
const location=path.join(__dirname,"./public");
app.use(express.static(location));
app.set("view engine","hbs");

         

app.use("/",require("./routes/pages"));
app.use("/auth",require("./routes/auth"));
         //express server

app.listen(4000,()=>{
    console.log("server started @port 4000");
});

 const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

