var express = require('express');
var router = express.Router();

var UserController = require('../controllers/user');

router.post('/signup', UserController.Create);
router.get('/signin', UserController.Indexsignin);
router.post('/signin', UserController.Signin);
router.get('/profile', UserController.Profile);
router.get('/signout', UserController.Signout);
module.exports = router;
