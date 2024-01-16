const  express = require("express");
const router = express.Router();
const userController = require("../controllers/organization.Controller")
// const authMiddleware = require("../middlewares/verify.token")

router.post("/create",userController.createOrganization);

module.exports = router;