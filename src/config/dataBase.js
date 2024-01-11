
const mongoose = require("mongoose");

mongoose.connect(process.env.dataBase).
then(()=>{
    console.log("connected to db")
}).catch((error)=>{
    console.log(error)
});


