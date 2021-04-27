var express = require('express');
var router = express.Router();

var UsersController = require('../controllers/users')

router.get('/signup', UsersController.Signup );
router.post('/signup', UsersController.CreateUser);
router.get('/welcome', UsersController.Welcome);
router.get('/login', UsersController.Login);
router.post('/login', UsersController.Authenticate);
router.post('/logout', UsersController.LogOut);
router.get('/:id', UsersController.Profile);

module.exports = router;