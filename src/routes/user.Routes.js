
// const jwt = require('jsonwebtoken');
const  express = require("express");
const router = express.Router();
const userController = require("../controllers/user.Controller")
const authMiddleware = require("../middlewares/verify.token")

router.post("/signup",userController.createUser);

router.post("/login",userController.loginUser);

module.exports = router;

