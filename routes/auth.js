const express=require("express");
const usercountroller=require("../controller/users");
const router =express.Router();


router.post("/register",usercountroller.register);
router.post("/login",usercountroller.login);
module.exports=router;
