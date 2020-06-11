
var express = require('express');
var router = express.Router();

var UserController = require('../controllers/user');

router.get('/signup', UserController.Index);
router.post('/signup', UserController.Create);

router.post('/login', UserController.Login);
router.get('/logout', UserController.Logout);




module.exports = router;
