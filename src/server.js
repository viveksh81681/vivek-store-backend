const express = require("express")
const cors = require("cors");
const env = require("dotenv")
const App = express()
App.use(cors())
env.config()
App.use(express.json())
const connect = require("./db")
const {ragister, login} = require("./Controllers/user")


App.post('/signup' , ragister)
App.post('/login' , login)


App.listen(process.env.PORT , async()=>{
    try {
     await connect()
    console.log("server in running " , `${process.env.PORT}`)   
    } catch (error) {
      console.log(error)  
    }
    
})