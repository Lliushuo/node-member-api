var express = require('express');
var router = express.Router();
var usersController = require("../controller/usersController")
var authMiddle = require("../middleware/authMiddle")

router.post("/loginup",usersController.loginup)
router.post("/loginin",usersController.loginin)
router.post("/isloginin",authMiddle,usersController.isloginin)
module.exports = router;
