var express = require('express');
var router = express.Router();

var UserController = require('../controllers/user');

router.post('/signup', UserController.Create);
router.get('/signin', UserController.Signin);


module.exports = router;
