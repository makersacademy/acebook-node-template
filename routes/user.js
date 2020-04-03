var express = require('express');
var router = express.Router();

var UserController = require('../controllers/user')

router.get('/user', UserController.Index);

module.exports = router;
