var express = require('express');
var router = express.Router();

var UserController = require('../controllers/user')

console.log(2)
router.get('/new', UserController.New); // currently it is at '/user' then it adds /new to the end
router.post('/new', UserController.Create);

module.exports = router;
