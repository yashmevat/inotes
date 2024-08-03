const express = require("express")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const user = require("../models/userModel");
const checkAuth = require("../middleware/checkAuth")
const router = express.Router();

router.post("/signup",async(req,res)=>{
    const {name,email,password} = req.body;
    try {
        let myuser = await user.findOne({email});
        if(myuser)
        {
            req.flash("error_msg","User Already Exist")
            res.redirect("/")
        }
        else{
            let salt = await bcrypt.genSalt(10);
            let hashpass = await bcrypt.hash(password,salt)
            let newuser = await user.create({
                name,email,password:hashpass
            })
            if(newuser){
                console.log("user Created SuccessFully");
                req.flash("success_msg","User Created Successfully")
                res.redirect("/login")
            }
        }
    } catch (error) {
        res.send({error})
    }

})

router.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    try {
        let myuser = await user.findOne({email});
        if(myuser)
        {
            if(await bcrypt.compare(password,myuser.password)){
                let payload = {
                    id:myuser.id,
                    email:myuser.email
                }
                const token = jwt.sign(payload,"my name is yash",{expiresIn:"3h"})
                res.cookie('token', token , {httpOnly: true });
                req.flash("success_msg","Logged In Successfully")
                return res.redirect("/user/dashboard")
            }
            else{
                req.flash("error_msg","invalid credentials")
                return res.redirect("/login")
            }
        } 
        else{
            req.flash("error_msg","User Does Not Exist")
            return res.redirect("/")
        }   
        
    } catch (error) {
        res.send({error})
    }

})
router.get("/dashboard",checkAuth,async(req,res)=>{
    let id = req.user.id;
    try {
        let myuser = await user.findById({_id:id})
        if(myuser){
            res.render("dashboard",{myuser})
        } 
        
    } catch (error) {
        
    }
    
})

router.get("/logout",checkAuth,(req,res)=>{
    res.clearCookie("token");
    req.flash("success_msg","Logged Out Successfully")
    res.redirect("/login");
    
})
module.exports  = router