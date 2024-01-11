const express = require('express');
const rootRouter = express.Router();
const user = require("../routes/user.Routes")


rootRouter.use('/user', user)

// rootRouter.use('/*', (req,res)=>{
//     res.send(404);
// });


 module.exports = rootRouter;