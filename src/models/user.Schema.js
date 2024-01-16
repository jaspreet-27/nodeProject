

const mongoose = require("mongoose");

const userSchema =  new mongoose.Schema({
    userName :{
        type :String,
        required : true
    },
    email :{
        type :String,
        required : true,
        unique: true

    },
    password :{
        type :String,
        required : true,
        unique: true
    },
    role: {
        type: String,
        enum: ["admin", "superAdmin"],
        default: "superAdmin",  
      },
});

const user = mongoose.model("user",userSchema);
module.exports = user;