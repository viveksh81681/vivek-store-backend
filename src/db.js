const mongoose = require("mongoose")

 const connect = ()=>{
    return mongoose.connect("mongodb+srv://Saarah123:Saarah123@cluster0.oo4zd.mongodb.net/mydb?authSource=admin&replicaSet=atlas-8111nd-shard-0&w=majority&readPreference=primary&retryWrites=true&ssl=true ")
}

module.exports = connect
