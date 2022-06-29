const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")



const UserSchema = new mongoose.Schema({
    fullname : {type:String , required: true},
    
    
    email :{type:String , required: true ,  unique : true},
    password :{type:String , required: true},
 contact :{type:String ,required:true},
 


}, {
    timestamps:true,
    versionKey:false
})






UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();

  // secret , salt => sdkfhsdkfh , secret + sdkfhsdkfh => dskfgkcskdfgsdkfsdf
  // salt
  // hashing rounds =>
  var hash = bcrypt.hashSync(this.password, 8);
  this.password = hash;
  return next();
});


UserSchema.methods.checkPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

  
const User = mongoose.model("User" , UserSchema)
module.exports = User