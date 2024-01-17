 
// const mongoose = require("mongoose");

// const organizationSchema =  new mongoose.Schema({
//     name :{
//         type :String,
//         required : true
//     },
//     email :{
//         type :String,
//         required : true,
//         unique: true
//     },
//     phone:{
//         type :String,
//         required : true, 
//         unique: true
//     },  
//     image: {
//         type: String,
//         unique: true
       
//       },
// });

// const organization = mongoose.model("organization",organizationSchema);
// module.exports = organization;

const mongoose = require("mongoose");

const organizationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    unique: true,
  },   
});

const Organization = mongoose.model("Organization", organizationSchema);

module.exports = Organization;
