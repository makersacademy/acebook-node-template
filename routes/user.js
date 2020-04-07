var express = require('express');
var router = express.Router();

var UserController = require('../controllers/user')

//GET route to get signup page
router.get('/signup', UserController.Signup);
//POST route to add a new user to the database
router.post('/', UserController.Create);
//GET route to check if user is in database
router.post('/profile', UserController.Authenticate);
//GET route to logout
router.get('/logout', UserController.Logout);
module.exports = router;
