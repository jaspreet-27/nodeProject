 
const mongoose = require("mongoose");

const organizationSchema =  new mongoose.Schema({
    Name :{
        type :String,
        required : true
    },
    email :{
        type :String,
        required : true,
        unique: true
    },
    phone:{
        type :String,
        required : true, 
        unique: true
    },  
    image: {
        type: String,
        unique: true
       
      },
});

const organization = mongoose.model("organization",organizationSchema);
module.exports = organization;