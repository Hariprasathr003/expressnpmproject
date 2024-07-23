
// const mysql=require("mysql");
//const bcrypt = require('bcryptjs/dist/bcrypt');
const { error } = require('console');
const bcrypt = require('bcryptjs');
const mysql = require('mysql2');

const db=mysql.createConnection({
    host: 'localhost', 
    user: 'root',     
    password: '1207', 
    database: 'login_db' 
});

exports.login=async(req,res)=>{
    
    try{
        const{ email,password }=req.body;
        if(!email || !password){
            return res.status(400).render("login",{
                mas:"plese enter your email and password"
            });
        }
        db.query("select * from users where email=?",
            [email],
            async(error,result)=>{
            console.log(result);
            if(result.length<=0){
                return res.status(400).render("login",{
                    mas:"plese enter your email and password"
                });
            }else{
                if (!(await bcrypt.compare(password,result[0].pass))){
                    return res.status(401).render("login",{
                        msg:"please enter your email and password"
                    });
                }else{
                    res.send("good");
                }
            }
            }
                );
    }
    catch(error){
        console.log(error);
    }
};


exports.register = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
    console.log(req.body);

    // Validate input
    if (!name || !email || !password || !confirmPassword) {
        return res.status(400).send('All fields are required');
    }

    if (password !== confirmPassword) {
        return res.status(400).send('Passwords do not match');
    }

    // Check if the user already exists
    db.query('SELECT email FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).send('Server error');
        }

        if (results.length > 0) {
            return res.status(400).send('Email already registered');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 8);

        // Insert the new user into the database
        db.query('INSERT INTO users SET ?', { FullName:name,Email:email,Password:pass}, (err, results) => {
            if (err) {
                console.error('Database insert error:', err);
                return res.status(500).send('Server error');
            }

            return res.status(200).send('User registered successfully');
        });
    });
};


// exports.register=(req,res)=>{
//       res.send("Form submitted");

//      console.log(req.body);
//     // const name=req.body.name;
//     // const email=req.body.email;
//     // const password=req.body.password;
//     // const confirm_password=req.body.confirm_password;
//     // console.log(name);

//     const { name,email,password,confirm_password }=reg.body;
//     db.query(
//         "select email from users where email=?",
//         [email],
//         (error,result)=>{
//             if(reeor){
//                 confirm.console.log(error);
//             }

//             if(result.length>0){
//                 return res.render("register",{msg:"email id already taken"});
//             }
//             else if(password!==confirm_password){
//                 return res.render("register",{msg:"password do not match"})
//             }
//             console.log(reg);

//             db.query("insert into users set ?",{FullName:name,Email:email,Password:pass},
                
//                 (error,result)=>{
//                     if(error){
//                         console.log(error);
//                     }
//                     else{
//                         console.log(result);
//                         return res.render("register",{msg:"user registration successfully"});
//                     }
                   
//             });
//         }
//         );
// };
    
    //console.log("Form submitted");



