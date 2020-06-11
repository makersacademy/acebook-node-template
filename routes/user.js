var express = require('express');
var router = express.Router();

var UserController = require('../controllers/user')

console.log(2)
router.post('/find', UserController.New); // currently it is at '/user' then it adds /new to the end
router.post('/new', UserController.Create);
router.get('/login', UserController.Index);
router.post('/login', UserController.Authenticate);
router.get('/verify', UserController.Verify);
router.get('/logout', UserController.Logout);

module.exports = router;
