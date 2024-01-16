
if (process.env.NODE_ !== "production") {
    require("dotenv").config();
  }
  require("dotenv").config();
  const express = require("express")
const app = express();
require("./src/config/dataBase");
// const bcrypt = require('bcrypt');
const my_routes = require("./src/routes")
const bodyParser = require("body-parser");
app.use(express.json());
app.use(bodyParser.json());
app.use('/', my_routes)
app.listen(8000,(req,res)=>{
    console.log("serving is running on 8000 port")
})