const express = require('express');
const rootRouter = express.Router();
const user = require("./user.Routes")
const organization = require("../routes/organization.Routes")
const link = require("../routes/linking.Routes");




rootRouter.use('/user', user)
rootRouter.use('/organization', organization)
rootRouter.use("/linking",link)


rootRouter.use('/*', (req,res)=>{
    res.send(404);
});


 module.exports = rootRouter;