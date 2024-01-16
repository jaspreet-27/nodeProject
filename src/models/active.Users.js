const mongoose = require("mongoose");

const avtiveUsers =  new mongoose.Schema({
  
    user: { type: mongoose.Types.ObjectId, ref: 'user'},
    activeOn: { type: Date, default: Date.now }

});

const checkUser= mongoose.model("userActive",avtiveUsers);
module.exports =  checkUser;