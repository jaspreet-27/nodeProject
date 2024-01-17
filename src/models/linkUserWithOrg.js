  const mongoose = require("mongoose");

  const linkUserWithOrg = new mongoose.Schema({
    user_id: { type: mongoose.Types.ObjectId, ref: "user" ,unique:"true" },
    organization_id: { type: mongoose.Types.ObjectId, ref: "organization" },
  });
  const link = mongoose.model("link", linkUserWithOrg);  
  module.exports = link;  
     