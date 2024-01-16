

const  express = require("express");
const  router = express.Router();
const Controller = require("../controllers/linkUsewrWithOrg.controller")


router.post("/create",Controller.linkUser);

module.exports = router;