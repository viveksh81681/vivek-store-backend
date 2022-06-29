const express = require("express")
const Router = express.Router()
require("dotenv").config()
const User = require("../Models/user.model")
const jwt = require("jsonwebtoken")

const newToken = (user)=>{
    return jwt.sign({user} , `${process.env.JWT_SECRET_KEY }`)
     
}  


Router.post("/signin" , async(req , res) =>{
 

}) 


 const ragister = async(req , res) =>{
    try {
        // res.send("register")
        let user = await User.findOne({ email: req.body.email }).lean().exec()
        if (user)
            return res.status(400).send({ message: "Please try another email" });

        user = await User.create(req.body);
        
        var token = newToken(user);
        
        // res.send({ user, token })
        // res.send(user)
        return res.send({user,token})

    } catch (e) {
      return   res.status(401).send(e.message)
    }
  
    
} 

const login = async(req , res )=>{
    try {
        // we will try to find the user with the email provided
        const user = await User.findOne({ email: req.body.email });
        // If user is not found then return error
        console.log(user)
        if (!user){
          return res
            .status(400)
            .send({ message: "Please try another email or password" });
        }else{
        // if user is found then we will match the passwords
        const match = user.checkPassword(req.body.password);
        if (!match){
          return res
            .status(400)
            .send({ message: "Please try another email or password" });
        }
        else{
        // then we will create the token for that user
        const token = newToken(user);
        
        // then return the user and the token
        return res.send({ user, token });
    }
}
      } catch (err) {
        return res.status(501).send(err);
      }
}




module.exports = {ragister , login} 