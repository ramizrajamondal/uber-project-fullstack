const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const userSchema = new mongoose.Schema({
    fullName:{
        firstName:{
            type: String,
            require: true,
            trim: true,
            minlength:[3,"first name must be contain 3 character"]
        },
        lastName:{
            type: String,
            trim: true,
        }
    },
    email:{
        type: String,
        trim: true,
        required: true,
    },
    password:{
       type: String,
       trim: true,
       require: true,
       select: false,
    },
    socketId:{
        type: String
    }
})
userSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password, 10);
}
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}
userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign(
        { _id: this._id},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: process.env.ACCESS_TOKEN_EXPIARY}
    );
   return token;
}
const userModel = mongoose.model("User",userSchema)
module.exports = userModel