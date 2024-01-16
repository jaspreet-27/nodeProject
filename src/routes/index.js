const express = require('express');
const rootRouter = express.Router();
const user = require("./user.Routes")
const organization = require("../routes/organization.Routes")
const linking = require("../routes/linking.Routes");




rootRouter.use('/user', user)
rootRouter.use('/organization', organization)
rootRouter.use("/linking",linking)


rootRouter.use('/*', (req,res)=>{
    res.send(404);
});


 module.exports = rootRouter;